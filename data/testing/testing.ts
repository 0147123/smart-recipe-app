function reverse(input: string): string {
  return input
    .split("") // Split the input string into an array of characters
    .map((char) => (char === "1" ? "0" : "1")) // Reverse each bit
    .join(""); // Join the reversed array back into a string
}

// Example usage:
const input = "11010";
const output = reverse(input);
console.log(output); // Expected output: "00101"
