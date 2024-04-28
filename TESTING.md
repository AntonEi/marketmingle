# Testing:

## Validator Testing

### ESLint
Eslint has been installed and configured. All code passes without errors. The only error logged is related to the Import.

### CSS
No errors were found when passing my CSS file through the official [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)

 <details>

 <summary>CSS</summary>

![CSS Validation](docs/readme_images/CSS.png)
 </details>

## Accessibility
 All pages received high scores in terms of Accessibility, Best Practices, and SEO. The lower scores in Performance are primarily attributed to issues such as render-blocking resources and the size of images

 ### Python
All Python files were run through [Pep8](https://pep8ci.herokuapp.com/#) with no errors found. 

## Browser Testing
- The Website was tested on Google Chrome, Firefox, Safari browsers with no issues noted.

## Device Testing
- The website was viewed on a variety of devices such as Desktop, Laptop, iPhone 8, iPhoneXR and iPad to ensure responsiveness on various screen sizes in both portrait and landscape mode. The website performed as intended. The responsive design was also checked using Chrome developer tools across multiple devices with structural integrity holding for the various sizes.

## Manual Testing

### Site Navigation
| Element               | Action     | Expected Result                                                    | Pass/Fail |
|-----------------------|------------|--------------------------------------------------------------------|-----------|
| NavBar                |            |                                                                    |           |
| Site Name (logo area) | Click      | Redirect to home                                                   | Pass      |
| Home Link             | Click      | Redirect to home                                                   | Pass      |
| Add post              | Click      | Opens the add post page                                            | Pass      |
| Add post              | Display    | Only visible if user in session                                    | Pass      |
| Feed                  | Click      | Opens the feedpage                                                 | Pass      |
| Feed                  | Display    | Only visible if user in session                                    | Pass      |
| Bullish               | Click      | Opens the Bullish page                                             | Pass      |
| Bullish               | Display    | Only visible if user in session                                    | Pass      |
| Bearish               | Click      | Opens the Bearish page                                             | Pass      |
| Bearish               | Display    | Only visible if user in session                                    | Pass      |
| Logout Link           | Click      | logges you out                                                     | Pass      |
| Logout Link           | Display    | Only visible if user in session                                    | Pass      |
| Sign Up Link          | Click      | Open Sign up page                                                  | Pass      |
| Sign Up Link          | Display    | Not visible if user in session                                     | Pass      |
| Log In Link           | Click      | Open Login page                                                    | Pass      |
| Log In Link           | Display    | Not visible if user in session                                     | Pass      |
| All Nav Links         | Hover      | Makes links gray                                                   | Pass      |
|                       |            |                                                                    |           |
| Mobile View           |            |                                                                    |           |
| Hamburger Menu        | Responsive | Display when screen size reduces to medium size                    | Pass      |
| Site Name (logo area) | Click      | Redirect to home                                                   | Pass      |
| Home Link             | Click      | Redirect to home                                                   | Pass      |
| Add post              | Click      | Opens the add post page                                            | Pass      |
| Add post              | Display    | Only visible if user in session                                    | Pass      |
| Feed                  | Click      | Opens the feedpage                                                 | Pass      |
| Feed                  | Display    | Only visible if user in session                                    | Pass      |
| Bullish               | Click      | Opens the Bullish page                                             | Pass      |
| Bullish               | Display    | Only visible if user in session                                    | Pass      |
| Bearish               | Click      | Opens the Bearish page                                             | Pass      |
| Bearish               | Display    | Only visible if user in session                                    | Pass      |
| Logout Link           | Click      | logges you out                                                     | Pass      |
| Logout Link           | Display    | Only visible if user in session                                    | Pass      |
| Sign Up Link          | Click      | Open Sign up page                                                  | Pass      |
| Sign Up Link          | Display    | Not visible if user in session                                     | Pass      |
| Log In Link           | Click      | Open Login page                                                    | Pass      |
| Log In Link           | Display    | Not visible if user in session                                     | Pass      |
|                       |            |                                                                    |           |


### Posts:
| Element              | Action            | Expected Result                                                                  | Pass/Fail |
|----------------------|-------------------|----------------------------------------------------------------------------------|-----------|
| Bullish              | Click             | If can press the bull if you are bullish about the content                       | Pass      |
| Bearish              | Click             | If can press the bear if you are bearish about the content                       | Pass      |
| Read more            | Click             | Opens the full content of the post                                               | Pass      |
| Comment              | Click             | Opens the posts page so you can comment                                          | Pass      |
| Link on header       | Click             | Opens the posts page                                                             | Pass      |
| Username             | Click             | Opens the profile page for the profile                                           | Pass      |
| Tags                 | Display           | Displays the tags                                                                | Pass      |
| Date                 | Display           | Displays when the post was created                                               | Pass      |
| Picture              | Display           | Displays the picture of the post                                                 | Pass      |
| Bullish/Bearish      | Display           | A green/red light around the post appears whether you are bullish or bearish     | Pass      |

### Most followed profiles/This weeks poll:
| Element               | Action     | Expected Result                                                    | Pass/Fail |
|-----------------------|------------|--------------------------------------------------------------------|-----------|
| Profile pics          | Display    | Redirect to profile                                                | Pass      |
| Usernames             | Display    | Displays the username                                              | Pass      |
| Follow/Unfollow       | Click      | Follows the profile you chosed                                     | Pass      |
| Follow/Unfollow       | Display    | Only visible if user in session                                    | Pass      |
| Poll                  | Display    | Only visible if user in session                                    | Pass      |
| Poll button           | Click      | choose what you want to answer on the poll                         | Pass      |
| Sign in to see poll   | Click      | Not visible if user in session                                     | Pass      |

### Post page:
| Element                 | Action            | Expected Result                                                                 | Pass/Fail |
|-------------------------|-------------------|---------------------------------------------------------------------------------|-----------|
| Bullish                 | Click             | If can press the bull if you are bullish about the content                      | Fail      |
| Bearish                 | Click             | If can press the bear if you are bearish about the content                      | Fail      |
| Read more               | Click             | Opens the full content of the post                                              | Pass      |
| User Comments           | Display           | Displays correct name date time and comment body                                | Pass      |
| User Comments           | Display           | Comments are ordered oldest to newest                                           | Pass      |
| Update comment button   | Display           | Button only visible if user is the comment author                               | Pass      |
| Update comment button   | Click             | Opens Update Comment Form                                                       | Pass      |
| Update comment form     | Leave empty       | Won't submit without content                                                    | Pass      |
| Delete comment button   | Display           | Button only visible if user is the comment author                               | Pass      |
| Delete comment button   | Click             | Opens delete comment confirmation page                                          | Pass      |
| Update post button      | Display           | Button only visible if user is the post author                                  | Pass      |
| Update post button      | Click             | Opens Update post Form                                                          | Pass      |
| Delete post button      | Display           | Button only visible if user is the post author                                  | Pass      |
| Delete post button      | Click             | Opens delete post confirmation page                                             | Pass      |
| Username                | Click             | Opens the profile page for the profile                                          | Pass      |
| Tags                    | Display           | Displays the tags                                                               | Pass      |
| Date                    | Display           | Displays when the post was created                                              | Pass      |
| Picture                 | Display           | Displays the picture of the post                                                | Pass      |
| Bullish/Bearish         | Display           | A green/red light around the post appears whether you are bullish or bearish    | Pass      |
 
### Profile page
| Element               | Action     | Expected Result                                                    | Pass/Fail |
|-----------------------|------------|--------------------------------------------------------------------|-----------|
| Profile pics          | Display    | Redirect to profile                                                | Pass      |
| Bio                   | Display    | Displays the bio                                                   | Pass      |
| Posts                 | Display    | Displays how many posts you have posted                            | Pass      |
| Followers             | Display    | Displays how many followers you have                               | Pass      |
| Following             | Display    | Displays how many you are following                                | Pass      |
| Edit profile          | Click      | Opens the the edit profile page                                    | Pass      |
| Edit profile          | Display    | User can edit bio and profile picture                              | Pass      |
| Change username       | Click      | User can change username                                           | Pass      |
| Change password       | Click      | User can change password                                           | Pass      |
| Posts                 | Display    | Users can see there own posts                                      | Pass      |


### Fixed Bugs

### Fixed Bugs

#### 1. Tag Display Issue
- Previously, there was a bug where tags were not displaying properly on the frontend. The issue was traced back to the backend code, where the incorrect tag data was being used. Specifically, the system was attempting to render "tag_data" instead of "tag". This has been rectified by updating the backend logic to correctly pass the tag information, ensuring that tags now display as intended.

#### 2. Poll Page Data Routing Problem
- Another bug encountered was related to the functionality of the poll page. Data was not being directed to the appropriate destination, resulting in incorrect display or processing of poll information. Through debugging, it was discovered that the data routing mechanism was flawed, causing the data to be misdirected. This issue has been addressed by implementing the correct routing logic, ensuring that poll data now reaches its intended location seamlessly.

### Unfixed Bugs

#### 1. Inability to Vote on Post Page
- Users are currently unable to express their sentiment (bullish or bearish) on posts when accessing the post page. Although the count is displayed, users cannot actively vote. This issue was identified during the testing phase and remains unresolved.

#### 2. Login Issues on Safari Mobile Browser
- There are reported difficulties when attempting to log in using the Safari browser on mobile devices. Users encounter obstacles preventing successful login, which could potentially impact user experience. This issue was identified during the testing phase and remains unresolved.
#### 3. Inability to Remove Votes on Poll Site
- On the poll site, users face a limitation where they cannot retract their votes once submitted. This issue was identified during the testing phase and remains unresolved.
