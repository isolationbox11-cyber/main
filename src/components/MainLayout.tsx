import { Header } from "./Header";
import FloatingEyes from "./FloatingEyes";

const MainLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="relative min-h-screen w-full">
      <FloatingEyes />
      <div className="flex min-h-screen w-full flex-col relative z-10">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
        </main>
      </div>
    </div>
);

export default MainLayout;