"use client";

import {
  createContext,
  useContext,
  useState,
  type ButtonHTMLAttributes,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type ProductMode = "dashboard" | "integration" | "both";
type Modal = "demo" | "planner" | "privacy" | "about" | null;
type Usage = { classes: number; recording: boolean };
type WebsiteState = {
  modal: Modal;
  setModal: Dispatch<SetStateAction<Modal>>;
  mode: ProductMode;
  setMode: Dispatch<SetStateAction<ProductMode>>;
  usage: Usage;
  setUsage: Dispatch<SetStateAction<Usage>>;
};
const WebsiteContext = createContext<WebsiteState | null>(null);

export function WebsiteProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<Modal>(null);
  const [mode, setMode] = useState<ProductMode>("dashboard");
  const [usage, setUsage] = useState<Usage>({
    classes: 20,
    recording: true,
  });
  return (
    <WebsiteContext.Provider
      value={{ modal, setModal, mode, setMode, usage, setUsage }}
    >
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite() {
  const context = useContext(WebsiteContext);
  if (!context) throw new Error("Website components require WebsiteProvider.");
  return context;
}

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;
export function DemoButton(props: ButtonProps) {
  const { setModal } = useWebsite();
  return <button {...props} type="button" onClick={() => setModal("demo")} />;
}
export function PlannerButton({
  mode,
  ...props
}: ButtonProps & { mode?: ProductMode }) {
  const { setModal, setMode } = useWebsite();
  return (
    <button
      {...props}
      type="button"
      onClick={() => {
        if (mode) setMode(mode);
        setModal("planner");
      }}
    />
  );
}
export function InfoButton({
  kind,
  ...props
}: ButtonProps & { kind: "privacy" | "about" }) {
  const { setModal } = useWebsite();
  return <button {...props} type="button" onClick={() => setModal(kind)} />;
}
export function CopyrightYear() {
  // The marketing page is prerendered consistently at build time.
  return <span id="year">{new Date().getUTCFullYear()}</span>;
}
