"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type PointerEvent,
} from "react";
import { Dialog } from "./dialog";
import { useWebsite } from "./website-provider";

const colours = [
  { value: "#de633e", name: "Orange" },
  { value: "#41684e", name: "Green" },
  { value: "#343a40", name: "Dark" },
];
type Point = { x: number; y: number };

export function ClassroomDemo() {
  const { modal, setModal } = useWebsite();
  const canvas = useRef<HTMLCanvasElement>(null);
  const pointer = useRef<number | null>(null);
  const previous = useRef<Point | null>(null);
  const log = useRef<HTMLDivElement>(null);
  const [colour, setColour] = useState(colours[0].value);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ name: string; text: string }[]>([
    {
      name: "Ananya · Demo teacher",
      text: "Welcome! What would you like to explore today?",
    },
    { name: "Sara · Demo student", text: "Can we draw the curve together?" },
  ]);

  function clearBoard() {
    const board = canvas.current;
    board?.getContext("2d")?.clearRect(0, 0, board.width, board.height);
  }
  function sampleDrawing() {
    const context = canvas.current?.getContext("2d");
    if (!context) return;
    clearBoard();
    context.save();
    context.font = "24px Georgia";
    context.fillStyle = "#516b48";
    context.fillText("What can the shape tell us?", 65, 60);
    context.strokeStyle = "#a8b398";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(120, 290);
    context.lineTo(880, 290);
    context.moveTo(500, 100);
    context.lineTo(500, 520);
    context.stroke();
    context.strokeStyle = "#de633e";
    context.lineWidth = 5;
    context.beginPath();
    for (let x = -210; x <= 210; x++) {
      const y = 440 - (x * x) / 140;
      if (x === -210) context.moveTo(x + 500, y);
      else context.lineTo(x + 500, y);
    }
    context.stroke();
    context.fillStyle = "#78866b";
    context.font = "22px Georgia";
    context.fillText("y = x² − 4", 650, 155);
    context.font = "18px Georgia";
    context.fillText("Try a new idea. Draw on the board.", 65, 560);
    context.restore();
  }
  useEffect(() => {
    sampleDrawing();
  }, []);
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages]);
  function stopDrawing() {
    pointer.current = null;
    previous.current = null;
  }
  function position(event: PointerEvent<HTMLCanvasElement>): Point {
    const board = event.currentTarget;
    const rect = board.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) * board.width) / rect.width,
      y: ((event.clientY - rect.top) * board.height) / rect.height,
    };
  }
  function stroke(from: Point, to: Point) {
    const context = canvas.current?.getContext("2d");
    if (!context) return;
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.strokeStyle = colour;
    context.lineWidth = 4;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
  function addMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = message.trim();
    if (!text) return;
    setMessages((existing) =>
      [...existing, { name: "You · Local demo", text }].slice(-50),
    );
    setMessage("");
  }
  function close() {
    stopDrawing();
    setModal(null);
  }

  return (
    <Dialog
      open={modal === "demo"}
      onClose={close}
      id="classroom-demo"
      className="demo-dialog"
      title="A lesson for one learner."
      eyebrow="1:1 CLASSROOM DEMO"
      closeLabel="Close classroom demo"
      intro="Explore a lesson between one teacher and one student. Try the whiteboard and sample chat locally, with no live participants, camera, or recording."
    >
      <div className="demo-workspace">
        <div className="demo-board-area">
          <div className="demo-toolbar">
            <div role="group" aria-label="Drawing colour">
              {colours.map((pen) => (
                <button
                  key={pen.value}
                  type="button"
                  className={`swatch${colour === pen.value ? " selected" : ""}`}
                  style={{ "--swatch": pen.value } as CSSProperties}
                  aria-label={`${pen.name} pen`}
                  aria-pressed={colour === pen.value}
                  onClick={() => setColour(pen.value)}
                />
              ))}
            </div>
            <span>Draw something worth explaining.</span>
            <button
              id="clear-board"
              type="button"
              className="text-link"
              onClick={clearBoard}
            >
              Clear
            </button>
          </div>
          <canvas
            ref={canvas}
            id="demo-canvas"
            width={1000}
            height={600}
            aria-label="Demonstration drawing board. Use a pointer or touch to draw. Keyboard users can add the sample graph below."
            onPointerDown={(event) => {
              if (
                pointer.current !== null ||
                (event.pointerType === "mouse" && event.button !== 0)
              )
                return;
              pointer.current = event.pointerId;
              previous.current = position(event);
              event.currentTarget.setPointerCapture(event.pointerId);
              stroke(previous.current, {
                x: previous.current.x + 0.1,
                y: previous.current.y + 0.1,
              });
            }}
            onPointerMove={(event) => {
              if (event.pointerId !== pointer.current || !previous.current)
                return;
              const current = position(event);
              stroke(previous.current, current);
              previous.current = current;
            }}
            onPointerUp={stopDrawing}
            onPointerCancel={stopDrawing}
            onLostPointerCapture={stopDrawing}
          >
            Your browser does not support the drawing canvas.
          </canvas>
          <div className="board-accessibility">
            <span>Pointer or touch to draw.</span>
            <button
              id="sample-drawing"
              type="button"
              className="text-link"
              onClick={sampleDrawing}
            >
              Add a sample graph ↗
            </button>
          </div>
        </div>
        <aside className="demo-chat">
          <h3>
            Teacher &amp; student chat <span>DEMO</span>
          </h3>
          <div
            ref={log}
            id="demo-messages"
            className="demo-messages"
            role="log"
            aria-label="Example classroom messages"
            aria-live="polite"
          >
            {messages.map((item, index) => (
              <div key={index} className="demo-message">
                <strong>{item.name}</strong>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <form id="chat-form" onSubmit={addMessage}>
            <label className="sr-only" htmlFor="chat-message">
              Add a local demo message
            </label>
            <input
              id="chat-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={240}
              placeholder="Add a demo message…"
              required
              autoComplete="off"
            />
            <button type="submit" aria-label="Add demo message">
              ↑
            </button>
          </form>
          <small>
            Your messages stay in this demo and disappear when the page reloads.
          </small>
        </aside>
      </div>
    </Dialog>
  );
}
