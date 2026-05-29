window.AMC_DATA = {
  lessons: [
    { id: 1, title: "Prime Factorizations", indexedExamples: 20, topics: ["integers", "prime numbers", "prime factorization", "divisors"] },
    { id: 2, title: "LCM, GCD and Congruence", indexedExamples: 22, topics: ["lcm", "gcd", "modular arithmetic"] },
    { id: 3, title: "Congruence and Divisibility", indexedExamples: 21, topics: ["remainders", "divisibility", "modular cases"] },
    { id: 4, title: "Digits and Base Number", indexedExamples: 21, topics: ["digits", "place value", "bases"] },
    { id: 5, title: "Arithmetic and Geometric Sequences", indexedExamples: 21, topics: ["arithmetic sequence", "geometric sequence", "series"] },
    { id: 6, title: "Recursive Sequences", indexedExamples: 27, topics: ["recursion", "iteration", "patterns"] },
    { id: 7, title: "Factorization, Fractions and Radicals", indexedExamples: 27, topics: ["algebraic factoring", "fractions", "radicals"] },
    { id: 8, title: "Polynomials and Absolute Value", indexedExamples: 27, topics: ["polynomials", "absolute value", "functions"] },
    { id: 9, title: "Transformations, Circles and Conics", indexedExamples: 22, topics: ["coordinate geometry", "circles", "conics"] },
    { id: 10, title: "Floor Function and Quadratics", indexedExamples: 22, topics: ["floor function", "quadratics", "casework"] },
    { id: 11, title: "Diophantine Equations and Word Problems", indexedExamples: 20, topics: ["integer equations", "word problems"] },
    { id: 12, title: "Inequalities", indexedExamples: 24, topics: ["cauchy", "am-gm", "bounds"] },
    { id: 13, title: "Trigonometric Functions", indexedExamples: 28, topics: ["trig", "compound angles"] },
    { id: 14, title: "Logarithms", indexedExamples: 28, topics: ["log rules", "exponents"] },
    { id: 15, title: "Complex Numbers and Equations", indexedExamples: 20, topics: ["complex numbers", "equations"] },
    { id: 16, title: "Polar Complex Numbers and Unit Roots", indexedExamples: 23, topics: ["polar form", "roots of unity"] },
    { id: 17, title: "Mid-term Exam", indexedExamples: 0, topics: ["mixed review"] },
    { id: 18, title: "Right Triangles, Regular Polygons and Area", indexedExamples: 25, topics: ["right triangles", "area", "regular polygons"] },
    { id: 19, title: "Sine Rule, Cosine Rule, Median and Centroid", indexedExamples: 21, topics: ["law of sines", "law of cosines", "centroid"] },
    { id: 20, title: "Parallel Lines and Similar Triangles", indexedExamples: 21, topics: ["similarity", "parallel lines"] },
    { id: 21, title: "Angle Bisectors and Incircle", indexedExamples: 19, topics: ["angle bisectors", "incircle"] },
    { id: 22, title: "Circle", indexedExamples: 26, topics: ["circle geometry", "power of a point"] },
    { id: 23, title: "Solid Geometry", indexedExamples: 23, topics: ["volume", "surface area", "3d geometry"] },
    { id: 24, title: "Sum Rule and Product Rule", indexedExamples: 24, topics: ["counting", "sum rule", "product rule"] },
    { id: 25, title: "Permutation and Combination", indexedExamples: 22, topics: ["permutations", "combinations"] },
    { id: 26, title: "Positive Integer Solutions and Recursion", indexedExamples: 20, topics: ["stars and bars", "recursion"] },
    { id: 27, title: "Classical Probability", indexedExamples: 22, topics: ["probability", "counting outcomes"] },
    { id: 28, title: "Expected Value and Geometric Probability", indexedExamples: 21, topics: ["expected value", "geometric probability"] },
    { id: 29, title: "Statistics, Propositions and Logic", indexedExamples: 22, topics: ["statistics", "logic"] },
    { id: 30, title: "Final Exam", indexedExamples: 0, topics: ["mixed review"] }
  ],
  problems: [
    {
      id: "L1-E2",
      lessonId: 1,
      example: 2,
      topic: "exponents",
      status: "verified",
      source: "PDF page 5, paraphrased",
      title: "Digits of a large power",
      prompt: "How many digits are in 20^18?",
      answer: "24",
      tags: ["powers of 10", "place value", "mental arithmetic"],
      audit: "No logarithms are needed. The key is to split 20^18 into a small leading integer times a power of 10.",
      solutions: [
        {
          name: "Place-value split",
          steps: [
            "Rewrite 20^18 as (2 x 10)^18 = 2^18 x 10^18.",
            "Compute 2^18 mentally: 2^10 x 2^8 = 1024 x 256 = 262144.",
            "So 20^18 = 262144 followed by 18 zeros.",
            "The leading block has 6 digits, so the total digit count is 6 + 18 = 24."
          ]
        },
        {
          name: "Bounding without full multiplication",
          steps: [
            "Since 2^10 = 1024 is just over 10^3, 2^18 = 2^8 x 2^10 = 256 x 1024.",
            "This product is between 256000 and 512000, so it has exactly 6 digits.",
            "Multiplying by 10^18 appends 18 zeros.",
            "Therefore the number has 6 + 18 = 24 digits."
          ]
        }
      ]
    },
    {
      id: "L1-E3",
      lessonId: 1,
      example: 3,
      topic: "prime numbers",
      status: "verified",
      source: "PDF page 6, paraphrased",
      title: "Four prime expressions",
      prompt: "Positive integers A and B make A, B, A - B, and A + B all prime. Find the sum of these four primes.",
      answer: "17",
      tags: ["parity", "prime numbers", "mod 3"],
      audit: "The trap is assuming both A and B are odd. That makes A+B even and bigger than 2, so it cannot be prime.",
      solutions: [
        {
          name: "Parity first",
          steps: [
            "Because A and B are themselves prime, each is either 2 or odd.",
            "If both were odd, then A+B would be even and greater than 2, impossible for a prime.",
            "A cannot be 2, because A-B must be positive prime, so B would be smaller than 2.",
            "Thus B=2. Now A-2, A, and A+2 must all be prime.",
            "Among three odd numbers spaced by 2, one is divisible by 3. The only way this works is A-2=3, so A=5.",
            "The four primes are 5, 2, 3, and 7. Their sum is 17."
          ]
        },
        {
          name: "Small-prime forcing",
          steps: [
            "The prime A+B cannot be an even number larger than 2.",
            "So exactly one of A and B is 2.",
            "Since A-B is positive, A>B, giving B=2.",
            "Test A=3: A-B=1 is not prime. Test A=5: 3, 5, 7 all prime.",
            "For A>5, the three numbers A-2, A, A+2 include a multiple of 3 larger than 3.",
            "So A=5 is forced, and the required sum is 17."
          ]
        }
      ]
    },
    {
      id: "L1-E5",
      lessonId: 1,
      example: 5,
      topic: "prime numbers",
      status: "verified",
      source: "PDF page 6, paraphrased",
      title: "Three distinct primes",
      prompt: "How many ways can 37 be written as the sum of three distinct prime numbers?",
      answer: "5",
      tags: ["casework", "prime lists", "count once"],
      audit: "Order does not matter. A clean solution fixes the smallest prime first to avoid double counting.",
      solutions: [
        {
          name: "Ordered casework by smallest prime",
          steps: [
            "The sum is odd. Using 2 plus two odd primes would make an even sum, so 2 cannot appear.",
            "List odd primes below 37 and fix the smallest selected prime.",
            "With 3: the remaining pair sums to 34, giving (5,29) and (11,23).",
            "With 5: the remaining pair sums to 32, giving (13,19).",
            "With 7: the remaining pair sums to 30, giving (11,19) and (13,17).",
            "Starting at 11 or higher would repeat an already counted triple.",
            "Total: 5 ways."
          ]
        },
        {
          name: "Pair-sum table",
          steps: [
            "Exclude 2 by parity, then use odd primes only.",
            "For each possible first prime p, search for distinct prime pairs adding to 37-p.",
            "p=3 gives 34 = 5+29 = 11+23.",
            "p=5 gives 32 = 13+19.",
            "p=7 gives 30 = 11+19 = 13+17.",
            "No new triples occur after p=7 because the smallest element would already exceed the earlier cases.",
            "There are 2+1+2 = 5 triples."
          ]
        }
      ]
    },
    {
      id: "L1-E6",
      lessonId: 1,
      example: 6,
      topic: "prime factorization",
      status: "verified",
      source: "PDF page 7, paraphrased",
      title: "Maximize a sum with fixed product",
      prompt: "Distinct positive integers A, M, and C have product 2016. What is the largest possible value of A+M+C?",
      answer: "1011",
      tags: ["optimization", "factorization", "extreme principle"],
      audit: "For a fixed product, the sum is maximized by making two factors as small as possible, then giving the remaining product to the third factor.",
      solutions: [
        {
          name: "Extreme-factor argument",
          steps: [
            "To maximize the sum of three positive factors with a fixed product, make two of them as small as possible.",
            "The two smallest distinct positive factors are 1 and 2.",
            "The third factor must be 2016/(1 x 2) = 1008.",
            "The sum is 1 + 2 + 1008 = 1011."
          ]
        },
        {
          name: "Why no larger sum exists",
          steps: [
            "Let the three distinct positive factors be ordered x<y<z.",
            "Then x>=1 and y>=2, so xy>=2.",
            "Since xyz=2016, z=2016/(xy)<=1008.",
            "The largest possible z occurs at xy=2, which forces x=1 and y=2.",
            "That gives the maximum sum 1+2+1008=1011."
          ]
        }
      ]
    },
    {
      id: "L2-template",
      lessonId: 2,
      example: null,
      topic: "gcd",
      status: "needs-review",
      source: "Indexed from lesson map",
      title: "GCD/LCM examples awaiting curation",
      prompt: "This lesson has 22 indexed examples. Add each problem only after checking the statement, answer, and at least two no-calculator solution paths.",
      answer: "Pending",
      tags: ["gcd", "lcm", "congruence"],
      audit: "Do not bulk-generate solutions here. First extract the exact mathematical object, then verify by independent methods.",
      solutions: [
        {
          name: "Curation checklist",
          steps: [
            "Record source page and example number.",
            "Assign one primary knowledge point and optional secondary tags.",
            "Write a short mental solution before any algebra-heavy solution.",
            "Check the final answer using a different method."
          ]
        }
      ]
    }
  ]
};
