import { ColorSchemeSwitcher } from "~/components/ColorSchemeSwitcher";

const SettingsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center gap-4">
        <h1 className="text-6xl font-bold">Settings</h1>
        <ColorSchemeSwitcher />
      </main>
    </div>
  );
};

export default SettingsPage;
