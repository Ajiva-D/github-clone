const fetch = require('node-fetch');
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};
exports.handler = async function(event, context, callback) {
	console.log("running");
try {
	let res = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
		},
		body: JSON.stringify({
			query: `{
				viewer {
					login
					repositories(last: 20, ownerAffiliations: OWNER) {
						edges {
							node {
								id
								url
								updatedAt
								primaryLanguage {
									color
									name
								}
								name
								description
								forkCount
								isPrivate
								stargazerCount
							}
						}
					}
					avatarUrl
					bio
					name
				}
			}`,
		}),
	});
	let data = await res.json();
	callback(null, {
	statusCode: 200,
	headers,
	body: JSON.stringify(data)
});
} catch (error) {
	console.log(error);
}
};