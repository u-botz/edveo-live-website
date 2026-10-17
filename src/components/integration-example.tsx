const example = `// Illustrative pseudocode — not a live SDK
const classroom = await live.createClass({
  title: "Quadratics, made simple",
  externalReference: "maths-foundation-01",
  startsAt: scheduledTime
});

const access = await live.authorizeLaunch({
  classId: classroom.id,
  participant: authorisedStudent,
  role: "student"
});

// Open the classroom from your platform
redirect(access.launchUrl);`;

export function IntegrationExample() {
  const tokens = example.split(/(\/\/[^\n]*|"[^"\n]*"|\b(?:const|await)\b)/g);
  return (
    <pre>
      <code>
        {tokens.map((token, index) => (
          <span
            key={index}
            className={
              token.startsWith("//")
                ? "code-comment"
                : token.startsWith('"')
                  ? "code-green"
                  : /^(const|await)$/.test(token)
                    ? "code-purple"
                    : undefined
            }
          >
            {token}
          </span>
        ))}
      </code>
    </pre>
  );
}
