# MarketMingle

MarketMingle is a web application aimed at providing a platform for users to discuss and share insights about the stock market. Whether you're a seasoned investor or just getting started, MarketMingle offers a space to engage with fellow traders, share opinions, and stay informed about market trends.

The live link to the site can be found here - [MarketMingle](https://marketmingle-d94891f1357b.herokuapp.com/)

![site](docs/readme_images/stockforum.png)

## Site Owner Goals

- To create a vibrant community where users can freely discuss and exchange insights about the stock market.
- To provide users with easy access to relevant information and resources to enhance their trading experience.
- To foster engagement through features such as polls, following other users, and expressing bullish or bearish sentiments on posts.
- User-friendly design to ensure a seamless and enjoyable experience for all users.

## User Stories

- ### First-time User
  - As a first-time user, I want to understand the purpose of the site and how it can benefit me in navigating the stock market.
  - As a first-time user, I want to easily navigate the website and find relevant discussions without needing to sign up immediately.
  - As a first-time user, I want to explore the features of the site, such as polls and sentiment indicators, to gauge community sentiment.

- ### Returning User
  - As a returning user, I want to quickly access the latest discussions and updates on the stock market to stay informed.
  - As a returning user, I want to engage with other users by commenting on posts and following users with valuable insights.
  - As a returning user, I want to express my sentiment on posts by indicating whether I am bullish or bearish, contributing to the overall discussion.

- ### Frequent User
  - As a frequent user, I want to personalize my profile by adding a profile picture and a bio, enhancing my presence within the community.
  - As a frequent user, I want to participate in polls to share my opinion on various market topics and see how others are voting.
  - As a frequent user, I want to receive notifications about new posts, comments, and updates from users I follow, ensuring I stay engaged and informed.

## Features

All features have been prioritized and developed in response to the needs outlined in the user stories during the planning stage.

### Existing Features

#### Authentication

- Secure registraion and login process to ensure user authenticity.
- Once registered and logged in, users can set a new username and password in their profile.
- Logged out users have limited access to the features:
    - They won't see bull bear in the nav. they also won't see the poll.
    - They will be redirected back to the home page if they try access pages restricted to logged in users, like create a post.

<details><summary>Logged out user</summary>
<img src="">
</details>
<details><summary>Logged in user</summary>
<img src="">
</details>
<details><summary>Account settings</summary>
<img src="">
</details>
<details><summary>Change username</summary>
<img src="">
</details>
<details><summary>Change password</summary>
<img src="">
</details>

#### Navigation

- Responsive top navigation bar adaptable to various screen sizes.
- For logged-in users, additional options are accessible, including direct links to their profiles, ability to create posts, see the posts that they bullish or bearish, and logout option.
- On mobile size they can see a hambuger logo in the left corner.

<details><summary>Navigation</summary>
<img src="">
</details>
<details><summary>Navigation mobile</summary>
<img src="">
</details>

#### Profiles

- Personalized profiles showcasing user bio and posts.
- Displays follower counts and provides follow/unfollow functionality directly from the profile view if the visiting user is logged in.
- Features an edit option for users to update their profile bio and avatar.

<details><summary>Own profile</summary>
<img src="">
</details>
<details><summary>Profile - looged in</summary>
<img src="">
</details>
<details><summary>Profile - looged out</summary>
<img src="">
</details>


