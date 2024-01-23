# Project 1: Interactive Front-End Application

## bookBase 📕

This is an online database that uses the Google Books API to fetch book ISBNs and refer back eBook availability for digital borrowing from Open Library.

## Table of Contents

1. Description
2. Badges
3. Visuals
4. Installation
5. Usage
6. Contributions
7. License
8. Authors and acknowledgment
9. Project status

## 1. Description

Welcome to bookBase, a powerful web application designed to provide users with comprehensive information about any book title. It allows the user to not only retrieve relevant details about the searched book but also informs users about its availability for download on Open Library.

This project was a team collaboration. A great experience in version control, working with other developers, sharing ideas and having fun during the many different stages on the design, build and deployment.

## 2. Badges

![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Firefox](https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white)
![Edge](https://img.shields.io/badge/Edge-0078D7?style=for-the-badge&logo=Microsoft-edge&logoColor=white)
![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)
![IE](https://img.shields.io/badge/Internet%20Explorer-0076D6?style=for-the-badge&logo=Internet%20Explorer&logoColor=white)
![Safari](https://img.shields.io/badge/Safari-000000?style=for-the-badge&logo=Safari&logoColor=white)


## 3. Visuals

![screen 1](https://github.com/EddieDPayne/Project-bookBase/assets/139626561/0b5c0b3c-6a69-4412-9f3b-001524b78c44)
![screen 2](https://github.com/EddieDPayne/Project-bookBase/assets/139626561/f6f66d02-a9d6-4b2c-ab4a-7e6d0c097311)
![screen 3](https://github.com/EddieDPayne/Project-bookBase/assets/139626561/858c9499-b297-42af-beb8-604e311ac56f)
![screen 4](https://github.com/EddieDPayne/Project-bookBase/assets/139626561/99ad1994-6fd1-4199-9aa7-505707d038fe)


## 4. Installation

The app can be accessed using an internet browser. Code can be viewed using a code editor such as Microsoft Visual Studio Code.

Link to deployed app:

https://EddieDPayne.github.io/Project-bookBase

Link to gitHub repository:

https://github.com/EddieDPayne/Project-bookBase/


## 5. Usage

Effortless Book Information Retrieval: bookBase simplifies the process of obtaining information about any book title. Users can easily search for their favorite books and access details such as author, publication date, and a description.

Open Library Integration: Discover whether the searched book is available for download on Open Library.

Responsive Design: bookBase is optimized for various devices, including desktops, tablets, and smartphones. Enjoy a consistent experience across different screen sizes.

User-Friendly Interface: Our intuitive and user-friendly interface ensures a smooth and enjoyable experience. The clean design and straightforward navigation make it easy for users to find the information they need.

- Google books API refers the ISBN data to the Open Library API, which then returns eBook Availability to the user to show whether there is an eBook available for digital borrowing from the Open Library site.
- eBook availability is colour-coded for user convenience and readability
- The user's search history is saved in a displayed container at the top of the page. This displays the user's whole search activity in one session. On page refresh, the user is shown a single entry that is their last search.
- The search history can be deleted by button press.

## 6. Contributions
Here at bookBase we welcome contributions from the online community! If you'd like to enhance the experience or you have any questions or feedback, please don't hesitate to reach out.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". 
1.	Fork the Project
2.	Create your Feature Branch (git checkout -b feature/NewFeature)
3.	Commit your Changes (git commit -m 'Add some NewFeature')
4.	Push to the Branch (git push origin feature/NewFeature)
5.	Open a Pull Request

## 7. License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it as per the terms of the license associated with this repository.

Thank you for using bookBase! We hope it enhances your book-searching experience.

## 8. Authors and acknowledgment

The authors acknowledge and credit those who have contributed to this project, including:
•	https://git.bootcampcontent.com/Monash-University/MONU-VIRT-FSF-PT-11-2023-U-LOLC
•	Chee Ho Tai
•	Pranita Shrestha

## 9. Project status

Future development ideas:

- Expanding information returned by Open Library, e.g. not only eBook Availability, but also providing a link to the eBook borrowing page
- Creating more models for various error events
- Turning the menu/nav bar hrefs into functioning links to other pages, e.g. Home, About, Contact Us
- Providing a fallback thumbnail for books with broken thumbnail links
- Providing placeholder text to notify user that information is missing or incomplete (e.g. where the ISBN isn't listed)
- Formatting the book list into cards for better readability
- Styling headings


Happy reading! 📚

APIs:
https://www.openlibrary.org/api/

https://books.google.com/