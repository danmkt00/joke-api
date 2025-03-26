/**
 * Gets a joke from joke api
 *
 * @param {Array} [categories = ['Any']] - array with categories of jokes
 * @param {Array} [blacklist = []] - array with blocked topics
 * @returns {String} - a joke form api
 */

const getJoke = async (categories = ['Any'], blacklist = []) => {
    try {
        // Only add blacklistFlags if there are any
        const blacklistParam =
            blacklist.length > 0
                ? `blacklistFlags=${blacklist.join(',')}&`
                : '';

        //add category
        if (categories.length === 0) {
            categories = ['Any'];
        }
        const categoryParam = categories.join(',');

        const joke = await fetch(
            `https://v2.jokeapi.dev/joke/${categoryParam}?${blacklistParam}format=txt`
        );

        if (joke.status !== 200) {
            throw new Error('Error fetching joke');
        }
        return await joke.text();
    } catch (err) {
        console.error(err);
    }
};

export default getJoke;
