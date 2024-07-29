export default function playerGlobalStateManager() {
  let instance = null;

  function createInstance() {
    let isSwordEquipped = false;
    const maxHealth = 3;
    let health = maxHealth;
    let hasKey = false;
    let exp = 0;

    return {
      setIsSwordEquipped(value) {
        isSwordEquipped = value;
      },
      getIsSwordEquipped: () => isSwordEquipped,
      getMaxHealth: () => maxHealth,
      setHealth(value) {
        health = value;
      },
      getHealth: () => health,
      setHasKey(value) {
        hasKey = value;
      },
      getHasKey: () => hasKey,
      getExp: () => exp,
      setExp(value) {
        exp = value;
      },
    };
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    },
  };
}
