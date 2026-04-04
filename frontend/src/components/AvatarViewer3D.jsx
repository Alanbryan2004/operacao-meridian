import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ── GLB Sub-components ────────────────────────────────────── */

function Stage() {
    const { scene } = useGLTF('/Avatar/Palco.glb');
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);
    // Move stage down so world [0,0,0] is at the deck surface
    return <primitive object={scene} position={[0, -0.4, 0]} />;
}

function AvatarModel({ avatarId }) {
    const path = `/Avatar/M/${avatarId}.glb`;
    const { scene } = useGLTF(path);

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    // Reset to identity
    return <primitive object={scene} position={[0, 0, 0]} rotation={[0, 0, 0]} />;
}

function ClothingModel({ roupaId }) {
    if (!roupaId) return null;
    const path = `/Avatar/roupas/${roupaId}.glb`;
    const { scene } = useGLTF(path);

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    // Reset to identity - should align with avatar if exported correctly
    return <primitive object={scene} position={[0, 0, 0]} rotation={[0, 0, 0]} />;
}

/* ── Auto-rotate wrapper ───────────────────────────────────── */

function AutoRotate({ children, speed = 0.3, controlsRef }) {
    const groupRef = useRef();
    useFrame(() => {
        // Only auto-rotate if user is not dragging
        if (groupRef.current && controlsRef?.current && !controlsRef.current._isDragging) {
            // Don't auto-rotate when user has interacted recently
        }
    });
    return <group ref={groupRef}>{children}</group>;
}

/* ── Fallback Loader ───────────────────────────────────────── */

function Loader() {
    return (
        <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="#3b82f6" wireframe />
        </mesh>
    );
}

/* ── Main Component ────────────────────────────────────────── */

export default function AvatarViewer3D({ avatarId = "Avatar01", roupaId = null, height = 450 }) {
    const controlsRef = useRef();

    return (
        <div style={{ width: '100%', height, borderRadius: 20, overflow: 'hidden', position: 'relative', background: '#020617' }}>
            <Canvas
                shadows
                camera={{ position: [0, 1.5, 3.5], fov: 45 }}
                gl={{ antialias: true, alpha: false }}
                onCreated={({ gl, scene }) => {
                    scene.background = new THREE.Color('#070e1a');
                    gl.setClearColor('#070e1a');
                }}
            >
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <spotLight
                    position={[2, 5, 3]}
                    angle={0.4}
                    penumbra={0.8}
                    intensity={2}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />
                <spotLight
                    position={[-2, 4, -1]}
                    angle={0.5}
                    penumbra={1}
                    intensity={1}
                    color="#6495ED"
                />
                <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffffff" />

                {/* Environment for reflections */}
                <Environment preset="city" />

                {/* Scene content */}
                <Suspense fallback={<Loader />}>
                    <Stage />
                    <AvatarModel avatarId={avatarId} />
                    {roupaId && <ClothingModel roupaId={roupaId} />}
                </Suspense>

                {/* Controls */}
                <OrbitControls
                    ref={controlsRef}
                    enablePan={false}
                    enableZoom={true}
                    minDistance={2}
                    maxDistance={6}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2.1}
                    autoRotate
                    autoRotateSpeed={1.5}
                    target={[0, 1, 0]}
                />
            </Canvas>

            {/* Overlay: drag hint */}
            <div style={{
                position: 'absolute',
                bottom: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: 10,
                color: 'rgba(255,255,255,0.4)',
                fontWeight: 700,
                letterSpacing: 1,
                pointerEvents: 'none',
                textTransform: 'uppercase',
            }}>
                🔄 Arraste para girar
            </div>
        </div>
    );
}
