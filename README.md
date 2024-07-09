# Jammming: Spotify Playlist Project

## Introduction

This is a project for the Codecademy full stack developer course. The technologies used are React + CSS. This is the first project where students were left to solve some issues themselves.  

## Implemetation
The key skills here are:  

* Connecting to a third party site via Oath.
* Passing States between React components using props and callbacks.
* Requesting and saving data to a third party site via fetch requests.  

## Styling 
As Spotify is a music app I used css to present the track list builder in a style similar to the digital display on a car stereo. I just used plain CSS.  

## Challenges 
The biggest challenge here was the acquisition of a OAuth token from Spotify since this was a new process for me. The challenge here was handing the control of the website back and forth from Spotify. I solved this issue by realising that i needed to reorder how the program checked for its auth state. The checks should happen in reverse chronological order with the check to be logged in happening first, then the check to see if there is a bearer token and finally showing the link to log in to Spotify last.  

The next challenge was passing the files asynchronously from Spotify and into the various states of the site. MAstering nested callbacks was key here and letting the program handle its own flow.

## Conclusion

The Jammming project provided a comprehensive introduction to working with React and CSS, emphasizing real-world development practices such as connecting to third-party APIs via OAuth, managing state across components, and handling asynchronous data flows. Successfully acquiring an OAuth token from Spotify and integrating it within the application workflow was a significant milestone, demonstrating the importance of authentication and authorization in web development.  
Overall, this project has not only improved my technical skills but also reinforced the importance of problem-solving and adaptability in software development. Moving forward, these skills will be invaluable as I tackle more complex projects and continue my journey as a full stack developer.  