// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

axios
	.get("https://lambda-times-api.herokuapp.com/articles")
	.then((res) => {
		console.log(res.data.articles);
		let cardData = res.data.articles;
		const cards = document.querySelector("div.cards-container");
		for (const key in cardData) {
			const propData = cardData[key];
			propData.forEach((item) => {
				// console.log(item);
				return cards.appendChild(ArticleCards(item));
			});
		}
	})
	.catch((err) => {
		console.log(err);
	});

function ArticleCards({ headline, authorName, authorPhoto }) {
	const card = document.createElement("div");
	const cardHeadline = document.createElement("div");
	const cardAuthor = document.createElement("div");
	const authorImg = document.createElement("div");
	const imgSrc = document.createElement("img");
	const authorNameTag = document.createElement("span");

	card.classList.add("card");
	cardHeadline.classList.add("headline");
	cardAuthor.classList.add("author");
	authorImg.classList.add("img-container");

	cardHeadline.textContent = `${headline}`;
	imgSrc.src = `${authorPhoto}`;
	authorNameTag.textContent = `By ${authorName}`;

	card.appendChild(cardHeadline);
	card.appendChild(cardAuthor);
	cardAuthor.appendChild(authorImg);
	authorImg.appendChild(imgSrc);
	cardAuthor.appendChild(authorNameTag);

	card.addEventListener("click", () => console.log(`${headline}`));

	return card;
}
