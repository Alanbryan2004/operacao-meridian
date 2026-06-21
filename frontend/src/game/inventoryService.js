import { supabase } from "../lib/supabase";

/**
 * Service to manage user inventory (items like Satélite, Dossiê, etc.)
 */
export const inventoryService = {
  /**
   * Fetches the user's inventory from Supabase
   */
  async getInventory(userId) {
    if (!userId) return null;
    
    try {
      const { data, error } = await supabase
        .from("user_inventory")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) throw error;
      
      // If no inventory exists, create one with default values
      if (!data) {
        const { data: newData, error: insertError } = await supabase
          .from("user_inventory")
          .insert([{ 
            user_id: userId, 
            fonte_anonima: 3, 
            dossie_sigiloso: 1, 
            satelite_atlas: 1,
            licenca_tatica: 0
          }])
          .select()
          .single();
          
        if (insertError) throw insertError;
        return newData;
      }
      
      return data;
    } catch (err) {
      console.error("[inventoryService] Error fetching inventory:", err);
      return null;
    }
  },

  /**
   * Consumes an item from the user's inventory
   * @param {string} userId 
   * @param {string} itemKey - 'fonte_anonima', 'dossie_sigiloso' or 'satelite_atlas'
   */
  async consumeItem(userId, itemKey) {
    if (!userId || !itemKey) return false;
    
    try {
      // We use RPC or a simple update for now
      // First get current quantity
      const { data, error: fetchError } = await supabase
        .from("user_inventory")
        .select(itemKey)
        .eq("user_id", userId)
        .single();
        
      if (fetchError) throw fetchError;
      
      const currentQty = data[itemKey];
      if (currentQty <= 0) return false;
      
      const { error: updateError } = await supabase
        .from("user_inventory")
        .update({ [itemKey]: currentQty - 1 })
        .eq("user_id", userId);
        
      if (updateError) throw updateError;
      return true;
    } catch (err) {
      console.error(`[inventoryService] Error consuming item ${itemKey}:`, err);
      return false;
    }
  },

  /**
   * Adds an item to the user's inventory
   */
  async addItem(userId, itemKey, quantity = 1) {
    if (!userId || !itemKey) return false;
    
    try {
      // Garante que o inventário existe antes de tentar atualizar
      await this.getInventory(userId);

      const { data, error: fetchError } = await supabase
        .from("user_inventory")
        .select(itemKey)
        .eq("user_id", userId)
        .single();
        
      if (fetchError) throw fetchError;
      
      const currentQty = data[itemKey] || 0;
      
      const { error: updateError } = await supabase
        .from("user_inventory")
        .update({ [itemKey]: currentQty + quantity })
        .eq("user_id", userId);
        
      if (updateError) throw updateError;
      return true;
    } catch (err) {
      console.error(`[inventoryService] Error adding item ${itemKey}:`, err);
      return false;
    }
  }
};
