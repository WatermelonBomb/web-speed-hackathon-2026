import type { Tokenizer, IpadicFeatures } from "kuromoji";

// kuromojiを動的インポートでロード（バンドルサイズ削減）
async function getTokenizer(): Promise<Tokenizer<IpadicFeatures>> {
  const kuromoji = await import("kuromoji");
  return new Promise((resolve, reject) => {
    kuromoji.default.builder({ dicPath: "/dicts" }).build((err, tokenizer) => {
      if (err) {
        reject(err);
      } else {
        resolve(tokenizer);
      }
    });
  });
}

type SentimentResult = {
  score: number;
  label: "positive" | "negative" | "neutral";
};

export async function analyzeSentiment(text: string): Promise<SentimentResult> {
  const [tokenizer, { default: analyze }] = await Promise.all([
    getTokenizer(),
    import("negaposi-analyzer-ja"),
  ]);
  const tokens = tokenizer.tokenize(text);

  const score = analyze(tokens);

  let label: SentimentResult["label"];
  if (score > 0.1) {
    label = "positive";
  } else if (score < -0.1) {
    label = "negative";
  } else {
    label = "neutral";
  }

  return { score, label };
}
