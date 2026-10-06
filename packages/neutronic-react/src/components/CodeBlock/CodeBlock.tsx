import { forwardRef, useEffect, useRef, useState, type HTMLAttributes } from "react";
import { Check, Copy } from "lucide-react";
import { cx } from "../../utils/cx";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";

/** Props for {@link CodeBlock}. */
export interface CodeBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** The source text to display. Leading and trailing blank lines are trimmed. */
  code: string;
  /** Language name shown in the header, such as `"tsx"` or `"bash"`. */
  language?: string;
  /** File name shown in the header. */
  filename?: string;
  /** Numbers each line in a muted gutter. */
  showLineNumbers?: boolean;
  /** Shows a button that copies `code` to the clipboard. Defaults to `true`. */
  copyable?: boolean;
  /** Draws accent corner brackets around the block. */
  bracket?: boolean;
}

/**
 * Displays preformatted source code with an optional header and copy button.
 *
 * @example <CodeBlock language="bash" code="pnpm add @ionnet/neutronic" />
 */
export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(function CodeBlock(
  { code, language, filename, showLineNumbers, copyable = true, bracket, className, ...rest },
  ref,
) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const text = code.replace(/^\s*\n|\n\s*$/g, "");
  const lines = text.split("\n");
  const hasHeader = language != null || filename != null;

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = () => {
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 1600);
      },
      () => setCopied(false),
    );
  };

  const copyButton = copyable && (
    <Button
      size="sm"
      variant="ghost"
      iconOnly
      className="nt-code-block-copy"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy code"}
      title={copied ? "Copied" : "Copy code"}
    >
      <Icon icon={copied ? Check : Copy} size="sm" />
    </Button>
  );

  return (
    <div
      ref={ref}
      className={cx("nt-code-block", bracket && "nt-bracket", className)}
      data-line-numbers={showLineNumbers || undefined}
      data-floating-copy={(!hasHeader && copyable) || undefined}
      {...rest}
    >
      {hasHeader ? (
        <div className="nt-code-block-header">
          {filename != null && <span className="nt-code-block-filename">{filename}</span>}
          {language != null && <span className="nt-code-block-language">{language}</span>}
          {copyButton}
        </div>
      ) : (
        copyButton
      )}
      <pre className="nt-code-block-pre nt-focus" tabIndex={0}>
        <code data-language={language}>
          {lines.map((line, index) => (
            <span className="nt-code-block-line" key={index}>
              {line}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
});
