export default (config: { mock?: boolean; setup: () => void }) => {
  const { mock = import.meta.env.MODE === "development", setup } = config;
  if (mock === false) return;
  setup();
};
