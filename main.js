
function levenshtein(a, b) {
    const an = a.length;
    const bn = b.length;
    if (an == 0) return bn;
    if (bn == 0) return an;
    const matrix = Array.from(Array(an + 1), () => Array(bn + 1).fill(0));
    for (let i = 0; i <= an; i++) matrix[i][0] = i;
    for (let j = 0; j <= bn; j++) matrix[0][j] = j;
    for (let i = 1; i <= an; i++) {
        for (let j = 1; j <= bn; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // deletion
                matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j - 1] + cost // substitution
            );
        }
    }
    return matrix[an][bn];
}

function checkSimilarity() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;
    const distance = levenshtein(text1, text2);
    const similarity = ((Math.max(text1.length, text2.length) - distance) / Math.max(text1.length, text2.length)) * 100;
    document.getElementById('result').innerText = `Similarity: ${similarity.toFixed(2)}%`;
}

