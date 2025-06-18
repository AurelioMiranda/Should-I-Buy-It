import * as motion from "motion/react-client";

type DynamicButtonProps = {
    text: string;
    onClick: () => void;
};

export default function DynamicButton({ text, onClick }: DynamicButtonProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={box}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onClick();
            }}
        >
            <span style={label}>{text}</span>
        </motion.div>
    );
}

/**
 * ==============   Styles   ================
 */

const box: React.CSSProperties = {
    width: 120,
    height: 40,
    backgroundColor: "rgba(152, 17, 255, 0.22)",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    userSelect: "none",
};

const label: React.CSSProperties = {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: 'center'
};
