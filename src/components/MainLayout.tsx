import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import FloatingEyes from "./FloatingEyes";

const MainLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="relative min-h-screen w-full">
      <FloatingEyes />
      <div className="grid min-h-screen w-full md:grid-cols-[256px_1fr] relative z-10">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              {children}
          </main>
        </div>
      </div>
    </div>
);

export default MainLayout;