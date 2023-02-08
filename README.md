# Spotify Clone

This is an SPA that aims to clone the spotify application and allow the user to search for music, create playlists and save them to their authenticated spotify account. The user can create, manage and add songs to local playlists, listen to a preview version of the songs and upload their new playlists to spotify.
  
[Visit the application](https://spotify-app-8rdu.onrender.com)

## Table of Contents

- [Features](#Features)

- [Installation](#installation)

- [Development](#development)

- [Usage](#usage)

- [Instructional-GIF](#Instructional-GIF)

- [Video-Describing-Functionality](#Video-Describing-Functionality)

- [License](#License)

- [Badges](#Badges)

  

## Features

1. The login and signup pages use BCrypt to authenticate and protect the users passwords in the backend. The signup page requires several information fields to be entered including birthdate, email and an avatar url.

2. The Home page displays all the songs from the list of recommended playlists from spotify. This list changes daily and the playlist could be refreshed from the home page. Each song in the playlist is displayed as a tile and will play when the user hovers over it. Clicking on the tile will add the song to the user selected playlist from the drop down menu. Each tile displays a popover with more information about the song. 

3. The Search page allows searching for albums, artists, playlists and songs from a single search term. Ten Results are displayed for each search category. The song results are displayed with buttons that allow playing each song and adding each song to a particular playlist.

4. The playlist page displays the playlist information for each playlist owned by the user. Each playlist can be deleted, updated and read. A simple link in the navigation bar is provided for creating a playlist. Each page lists the songs that belong to that playlist and a convenient search bar at the bottom allows searching for new songs. All songs can be played from this page and when played, the playlist is queued in the song list. Clicking on repeat in the play bar at the bottom of the page will play all songs in the playlist on a loop. The songs are played from spotify and not provided in full so they are limited to 30 second clips.

5. A user is able to login with their spotify account through a convenient link. The users address must be added to the developer app registry before hand. The playlists created in this SPA can then be added to the users spotify account and played from the spotity website when logged into their account. 

6. The users profile is available in the upper right hand corner. The specifics about the user can be updated from the profile page.

7. The Library page displays links that render the users songs, playlists, artists or albums in more detail.

## Installation

After cloning this repository, you will need to install the frontend dependencies and the backend gems. Some configuration will be required to get the database to work, to provide credentials from the spotify to use their API and to host this app.
##### General Setup
Open in the editor and navigate to the client directory and run the command for installing the nodes using the following.
```js
$ npm install 
```
It is built with the React framework and must be initialized by running the following command.
```js
$ npm start
```
In a new terminal window at the root of the app, run the following command to install the gems required.
```rb
$ bundle install
```
Then run the following to start the server.
```rb
rails s
```
##### Database configuration
In order to change the database configuration to work with your preferred database, open the ```config/database.yml``` file and find the following entries, change the adapter to your preferred relational database management system, then change the name of the database to the name of yours.
```rb
default: &default
  adapter: postgresql <-- change to your preferred system -->
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
```
Find the environment database declaration and change the name to your database name.
```rb
  test:
  <<: *default
  database: spotify_app_test <-- change to the name of your database -->
  
  development:
  <<: *default
  database: spotify_app_development <-- change to the name of your database -->
```
If you will be hosting this app, then you will need to provide the database url of your hosted database instance from your hosting service.
```rb
production:
  <<: *default
  url: <%= ENV['DATABASE_URL'] %> <-- This URL reads from render, change to satisfy your hosting service's requirements -->
```
##### Spotify developer credentials
This app uses the API from Spotify through the RSpotify gem and requires a registered applications' credentials to be used for authorizing API calls to spotify and authenticating a spotify user to access their account from this application.
Use the following link to visit [Spotify](https://developer.spotify.com/documentation/web-api/quick-start/) for the steps to register this app and obtain your ```client_id``` and ```client_secret```.
Then run the following command to open your credential editor.
```rb
$ EDITOR="code --wait" bin/rails credentials:edit
```
Then paste your information from spotify inside the credentials file in the following format.
```rb
spotify:
  client_id: <-- client_id here -->
  client_secret: <-- client secret here -->
```
Be sure to close the file and verify you recieved the following message.
```rb
$ File encrypted and saved.
```
Remember to follow your hosting services guidelines to host this app!

Enjoy!

Clone the repo [from Github here](https://github.com/Bambam320/spotify-app)

## Development

***Home Page***
![](wire_frames/Home/home_page_wire_frame.png)

***Search Page***
![](wire_frames/Search/search_page_wire_frame.png)

***Profile Page***
![](wire_frames/Profile/profile_wire_frames.png)

***My Playlist Page***
![](wire_frames/LocalPlaylists/playlists_page_wire_frame.png)

***Audio Player Page***
![](wire_frames/Footer/footer_player_wire_frame.drawio.png)

***Local Users Artists, Songs, Playlists, Albums Page***\
![](wire_frames/Collection/artists/collection_artists_page_wire_frame.png)
![](wire_frames/Collection/songs/collection_songs_page_wire_frame.png)
![](wire_frames/Collection/playlists/collection_playlists_page_wire_frame.png)
![](wire_frames/Collection/albums/collection_albums_page_wire_frame.png)
<!-- ## Usage

The SPA's functions are described below with imagery and code to best demonstrate their use.

***SPA Component Tree***

The component tree includes an index file that attaches the react app to the DOM. Then an ```<App>``` component provides context and routing for all children's elements. The first is a ```<NavBar>``` component that provides a logo and links which vary by the type of user logged in if logged in at all. The ```<LoggedIn>``` component provides the name of the currently logged in user. The next is the ```<Appointments>``` component which displays all appointments by using the ```<AppointmentCard>``` for each appointment. The ```<AppointmentCardUpdate>``` component provides a form that can be used by the doctor to update the appointment information. The ```<AppointmentForm>``` component provides a form which the doctor can use to create a new appointment. The ```<AllProfileCard>``` and ```<ProfileCard>``` components will render a ```<DoctorProfileCard>``` or ```<AnimalProfileCard>``` component based on what type of user is logged in. The next is the ```<Signup>``` component that offers a form for a user or a doctor to sign up. Last is the ```<Patients>``` component which shows the logged in doctors current patients.
```
Index from the src folder
└── App 
  ├── NavBar
  |   └── LoggedIn
  ├── Home
  ├── Login   
  ├── Appointments
  |   └── AppointmentCard
  |       └── AppointmentCardUpdate
  ├── AppointmentForm
  ├── AllProfileCard
  |   └── DoctorProfileCard
  |   └── AnimalProfileCard
  ├── Signup
  ├── Profile
  |   └── DoctorProfileCard
  |   └── AnimalProfileCard
  └── Patients
```
***Entity Relationship Model***

Each character in the schema has many spells and each spell belongs to a single character.

![](images/ERM.png  "Entity Relationship Model")

***SignUp Page***

![](images/Signup.png  "Sign Up Page Example")

The SignUp component renders provides a form that is provided by rendering a controlled input from each key in the object form. That data is sent to the back end and automatically used to create either a doctor or animal with an associated user.
```
  ├── Signup  
```

The ```<SignUp>``` component provides an object that is defaulted to either a form for doctors or animals to sign up. That form is controlled and submitted to the back end for creating a user and an associated doctor or animal. The create action below, determines if the parameters are meant for a doctor, then extract and permit only those that a doctor needs. Those params are used to create a new doctor which will then be used to create a new user by association. That user is returned with the appropriately provided information, where a doctor will be sent with the associated animals and vice versa.

```rb
  def create
    if params[:role] == 'doc'
    permitted_doctor_params = params.extract!(:phone_number, :name, :address, :degree, :logo, :university, :specialty).permit!
    doctor = Doctor.create!(permitted_doctor_params)
    permitted_user_params = params.extract!(
      :username, :password, :password_confirmation, :role
    ).permit!
    user = doctor.create_user!(permitted_user_params)
    session[:user_id] = user.id
    render json: user, include: ['user_info', 'user_info.appointments', 'user_info.animals'], status: 201
  elsif params[:role] == 'pet'
    permitted_animal_params = params.extract!(:name, :sex, :breed, :color, :existing_conditions, :age, :disposition, :classification).permit!
    animal = Animal.create!(permitted_animal_params)
    permitted_user_params = params.extract!(
      :username, :password, :password_confirmation, :role
    ).permit!
    user = animal.create_user!(permitted_user_params)
    session[:user_id] = user.id
    render json: user, include: ['user_info', 'user_info.appointments', 'user_info.doctors'], status: 201
    end
  end
```
***Appointments Pages***

![](images/Appointments.png  "Appointment Page Example")

The appointments pages provide functionality to render, create, update and delete appointments.

```
  ├── Appointments
  |   └── AppointmentCard
  |       └── AppointmentCardUpdate
```
The Appointments Controller is fairly straightforward It provides actions to view all, create, update or delete an appointment. 

```rb
# Appointments Controller
  #returns all appointments
  def index
    render json: Appointment.all, status: :ok
  end

  # creates an appointment and returns it if valid
  def create
    appointment = Appointment.create!(appointment_params)
    if appointment
      render json: appointment, status: :created
    end
  end

  # updates an appointment and returns it if valid
  def update
    if find_appointment.update!(appointment_params)
      render json: find_appointment, status: :ok
    end
  end

  #destroys the appointment provided and returns an empty object
  def destroy
    find_appointment.destroy
    render json: {}, status: :accepted
  end
```
The create, update, and destroy actions are protected from unauthorized users with the following private authorization methods.

```rb
  #authorizes a user for actions pertaining only to that user
  def authorize_user
    return render json: { errors: ["Not authorized"] }, status: :unauthorized unless session[:user_id] == find_appointment.doctor.user.id || session[:user_id] == find_appointment.animal.user.id
  end

  #authorizes a user to be logged in before allowing the action
  def authorize_general
    return render json:{errors: ["not authorized"]}, status: :unauthorized unless session.include? :user_id
  end
```
![](images/AppointmentCreate.png  "Appointment Page Example")

The animals index action provides all users when requested by an animal. If the request comes from a doctor, then the animals will be provided to the frontend with the animals that already have an association with the logged in doctor filtered out. 

```rb
  # sends only those animals that do not currently have an appointment with the logged in doctor
  def index
    user = User.find(session[:user_id])
    if user.user_info_type == 'Doctor'
      animals_with_set_appointments = Appointment.where('doctor_id = ?', user.user_info_id).map { |apps| apps.animal_id }
      animals_with_set_appointments.length > 0 ? nil : animals_with_set_appointments = [0]
      render json: Animal.where.not("id IN (?)", animals_with_set_appointments).order(:name), status: :ok
      # otherwise all animals are sent
    else
      render json: Animal.all, status: :ok
    end
  end

```
The associations are created in the model files as described below. The ```Appointments``` model uses a join table between ```Doctors``` and ```Animals``` where it holds the primary key of each model as its foreign key. The The doctor and animal each may have many appointments and the appointment belongs to a doctor and to an animal. The ```User``` model uses a has_one / belongs_to relationship with a doctor and an animal. The doctor and animal model each have a ```has_one :user, as: :user_info``` where each can hold a record in the ```users``` table stored as user_info. This is allowed through the polymorphic option set to true.
```rb
class Animal < ApplicationRecord
  # has a user names as user_info which is shared with the doctor model
  has_one :user, as: :user_info
  # has many appointments and doctors
  has_many :appointments
  has_many :doctors, through: :appointments
end

class User < ApplicationRecord
  #validates the username to be unique between animals and doctors
  validates :username, presence: true, uniqueness: true
  #has a secure password from bcrypt
  has_secure_password
  #belongs to the user_info index in user which can store animals or doctors using the polymorphic option
  belongs_to :user_info, polymorphic: true
end

class Doctor < ApplicationRecord
  # validates some attributes
  validates :name, :address, presence: true, uniqueness: true
  # has a user names as user_info which is shared with the doctor model
  has_one :user, as: :user_info
  #has many appointments and animals
  has_many :appointments
  has_many :animals, through: :appointments
end

class Appointment < ApplicationRecord
  #each appointment belongs to a doctor and an animal
  belongs_to :doctor
  belongs_to :animal
end
```

## Instructional-GIF

***Login***

![](https://media.giphy.com/media/47mcaSeFTi7sjNC6Tt/giphy.gif)

***Updating and deleting appointments***

![](https://media.giphy.com/media/mVVW24GOYasetICweF/giphy.gif)


## Video-Describing-Functionality

    
   [![Watch the video](https://i.imgur.com/4KV9DO3.png)](https://youtu.be/OtEJsTMXXcs)



## License

MIT License
Copyright (c) 2022 Igor M.  

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice (including the next paragraph) shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, E ,AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGE, S OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TOR  ,T OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  

## Badges

  

![](https://img.shields.io/github/commit-activity/m/Bambam320/phase-4-vetapp-project)
 -->