import getJoke from "./get-joke.js";

global.fetch = jest.fn(() =>
    Promise.resolve({
        status: 200,
        text: () => Promise.resolve("This is a test joke."),
    })
);

describe("getJoke Function", () => {
    test("should return a joke (default category)", async () => {
        const joke = await getJoke();
        expect(joke).toBe("This is a test joke.");
    });

    test("should return a joke from a specific category", async () => {
        const joke = await getJoke(["Programming"]);
        expect(joke).toBe("This is a test joke.");
    });

    test("should return a joke from multiple categories", async () => {
        const joke = await getJoke(["Programming", "Pun"]);
        expect(joke).toBe("This is a test joke.");
    });

    test("should exclude blacklisted categories", async () => {
        const joke = await getJoke(["Any"], ["nsfw", "explicit"]);
        expect(joke).toBe("This is a test joke.");
    });

   
});
