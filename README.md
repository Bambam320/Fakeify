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
```
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

## Usage

The SPA's functions are described below with imagery and code to best demonstrate their use.

***SPA Component Tree***

The component tree includes an index file that attaches the react app to the DOM. Then the ```<App>``` component provides context and routing for all of the children elements. The ```<Helmetcode>``` component provides the favicon and description for the tab in the browser. The first component that the user sees is the ```<Login>``` component, which provides the login and signup page. The three main structural components are the ```<NavBar>, <Header> and <Footer>``` components. The ```<Navbar>``` component provides the links for all the components in the app, and it provides a list of all of the users playlists. The ```<Header>``` component provides a menu for the user to view their profile or logout and a main search bar. The ```<Footer>``` component is essentially a player which provides the song information as well as play, pause, skip, previous, shuffle and replay buttons. 

The ```<Home>``` component provides all the songs from the featured playlists from spotify. Each playlist comes from spotify and each song is provided as a tile. The song can be played by hovering over it or added to the selected playlist by clicking on it. The ```<Home>``` component renders a ```<HomeSong>``` component for each song. The ```<Search>``` component uses the search term from the main search bar in the ```<Header>``` component and lists a limit of 10 results for artists, albums, songs and playlists. The songs in the results render a ```<SongResultPlaylistForm>``` which allows selection of a playlist and a button to add the song to a playlist. The ```<Playlist>``` component renders when a specific playlist is clicked from the ```<Navbar>``` component. The ```<PlaylistInfo>``` component renders the information about the playlist, and clicking on any portion of the playlists information, renders the ```<PlaylistInfoDialog>``` component which opens a dialog that allows updating the information of the playlist. The ```<PlaylistSongRow>``` component renders the songs that belong to that playlist and allow the user to play the song or remove it from the playlist. The ```<SongRow>``` component lists the songs returned from the search bar that is available just below the playlists songs. It allows a user to play the song or add it to the playlist.

The ```<Profile>``` component provides information about the logged in user and the users authorized spotify account information. The ```<Collection>``` component renders links through the ```<CollectionLinks>``` component for displaying the users playlists, songs, artists and albums per playlist. The ```<CollectionPlaylists>``` display each playlist as a tile. The ```<CollectionSongs>``` renders each playlist and for each playlist it renders ```<CollectionSongEachSong>``` which displays each song for each playlist. The ```<CollectionAlbums>``` and ```<CollectionArtists>``` respectively render ```<CollectionAlbumsEachAlbum>``` and ```<CollectionArtistsEachArtist>``` displaying albums and artists for each playlist.

```
Index from the src folder
└── App 
  ├── Helmetcode
  ├── Login
  ├── Navbar
  ├── Header
  ├── Home
  |   └── HomeSong
  ├── Search
  |   └── SongResultPlaylistForm
  ├── Playlist 
  |   └── PlaylistInfo
  |       └── PlaylistInfoDialog
  |   └── PlaylistSongRow
  |   └── SongRow 
  ├── Profile 
  ├── Collection
  |   └── CollectionLinks
  ├── CollectionPlaylists
  ├── CollectionSongs
  |   └── CollectionSongEachSong
  ├── CollectionAlbums
  |   └── CollectionAlbumsEachAlbum
  ├── CollectionArtists
  |   └── CollectionArtistsEachArtist
  └── Footer
```
***Entity Relationship Model***

The User has many playlists and each of those playlists has many songs. Each song also belongs to an album and an artist. The artist also has many albums.

![](client/public/ERD.png  "Entity Relationship Model")

***Login and Sign Up Pages***

![](client/public/LoginSignupPage.png  "Login and Sign Up Page Example")

The Login and SignUp page are provided when no user is logged in and provide fields to create a new user or login. Their is an autologin function that automatically reads whether or not a user has signed in previously and logs them in.
```
  ├── Login
```

The ```<Login>``` component provides a form for a user to login through or a signup form that allows entry of a username, password and confirmation, avatar image address, birthdate, region and email address. The fields in the signup page are required, especially for the email address. This email address is used in order to be white-listed with spotify so that a user can login with their spotify account. That is used to save playlists created in this app to the users spotify account.
The backend provides actions to create and delete a user, as well as logging a user in, manually and automatically. All users are returned with their associated playlists, the playlists associated songs and the songs associated artists and albums.

```rb
  # finds a user and authenticates them then returns the user with 201 status code
  # sessions#login
  def create
    this_user = User.find_by!(username: user_params[:username])
    if this_user&.authenticate(user_params[:password])
      session[:user_id] = this_user.id
      user = clear_spotify_information(this_user)
      render json: user, include: ['playlists', 'playlists.songs', 'playlists.songs.artist', 'playlists.songs.album'], status: 201
    else
      render json: { errors: ["Username or Password is incorrect"] }, status: :unprocessable_entity
    end
  end
```
***Home Page***

![](client/public/HomePage.png "Home Page Example")

The Home page introduces the main components of the app, namely the Navbar, Header and Footer. The Navbar displays the links available in the app for the various pages. Below that it displays a link for each of the users playlists along with their image. The Header component provides an icon with the users name and avatar which opens a dropdown menu that provides a link to the users profile and a logout button which logs the user out of the application. The Footer component provides all of the information and functions for playing a song. The ```<Home>``` component provides a menu to select the playlist which the user wants to add a song to. Next to that is a buttom for requesting the next playlist from Spotify's featured playlists of the day. The title and the description of the playlist is displayed above the song tiles. Each tile represents a song from the playlist and allows a user to play the song when hovered over and to add a song to their playlist when clicked. Each tile displays a popover with additional information about the song.

```
  ├── Navbar
  ├── Header
  ├── Home
  |   └── HomeSong
  └── Footer
```
The backend receives the request from a ```useEffect``` in the ```<Home>``` component. The ```requestRefresh``` is a boolean held in state which is set by the clicking of the "refresh" button. This allows the fetch to run on the first render and when the button is clicked.

```js
  //bring in featured songs from the spotify_api
  useEffect(() => {
    const retrieveRecommendedSongs = async () => {
      try {
        setLoader(true);
        const data = await axios
          .get(`/spotify_api/show_featured`)
          .then((res) => {
            setFeaturedSongs(res.data.songs);
            setPlaylistInfo(res.data.playlist_info)
          });
        setLoader(false);
        setErrors([])
      } catch (err) {
        setErrors(err.errors);
      }
    }
    retrieveRecommendedSongs()
  }, [requestRefresh])
```
The spotify controller in the backend receives this request with the ```featured_songs``` action. A counter is held in a session that is incremented based on which featured playlist is requested. It is set to ```0``` initially, so the first playlist is returned, then incremented by 1 for each successive request for playlists. After the last playlist is requested, the session counter is set to ```0``` so the playlists are looped over. The songs are provided in a hash as a key, along with the playlist name and description.

```rb
    # requests the featured playlist from spotify then chooses the next one in numerical succession
    # the playlist has its songs filtered for only the ones that include an audio preview_url
    # then it is sent back as a part of a hash including the basic playlist info
    def featured_songs
      session[:current_featured_playlist] = session[:current_featured_playlist] || 0
      featuredPlaylistLength = RSpotify::Playlist.browse_featured.length
      def return_songs playlist_index
        featuredPlaylist = RSpotify::Playlist.browse_featured[playlist_index]
        unfilteredSongs = featuredPlaylist.tracks
        songs = unfilteredSongs.filter { |song| !song.preview_url.nil? }
        playlist = Hash.new
        playlist[:songs] = songs
        playlist[:playlist_info] = {
          name: featuredPlaylist.name,
          description: featuredPlaylist.description,
        }
        return playlist
      end
      if session[:current_featured_playlist] == featuredPlaylistLength - 1
        playlist = return_songs(session[:current_featured_playlist])
        session[:current_featured_playlist] = 0
        render json: playlist, status: :ok
      elsif session[:current_featured_playlist] > 0 && 
        playlist = return_songs(session[:current_featured_playlist])
        session[:current_featured_playlist] = session[:current_featured_playlist] + 1
        render json: playlist, status: :ok
      elsif session[:current_featured_playlist] == 0
        playlist = return_songs(session[:current_featured_playlist])
        session[:current_featured_playlist] = session[:current_featured_playlist] + 1
        render json: playlist, status: :ok
      else
        render json: { errors: ["An error occured, please try again."] }, status: :not_found
      end
    end
```
The ```<HomeSong>``` component is rendered for each song provided in the featured playlist. The ```onAddSong``` and ```playSong``` functions are passed down to each song.
```js
  <Grid container spacing={4} width='1000px' sx={{ marginLeft: '35px', marginTop: '35px', marginBottom: '125px' }}>
    {featuredSongs.map((song) => {
      return (
        <HomeSong
          key={song.id}
          song={song}
          onAddSong={handleAddSongToPlaylist}
          playSong={sendToPlayer}
        />
      )
    })}
  </Grid>
```
When the pointer enters a song tile, a popover is opened to display extra information, the anchor is set as the song tile for the popover to open against and the song is sent to the player located in the ```<Footer>``` component.
```js
  <Card
    onClick={() => onAddSong(song)}
    onMouseEnter={(e) => {
      playSong(e, song)
      handlePopoverOpen(e)
      handleAnchorSongElementSelect(e)
    }}
    onMouseLeave={handlePopoverClose}
  >
```
The player function sets state for both the song that is meant to be played and the collection that the song belongs to. In this case, the song collection is all of the songs in the playlist. That state is sent to the Footer component which is listening for changes in this state to play the song.
```js
  //send the song and entire playlist to the player
  function sendToPlayer(e, track) {
    e.preventDefault()
    setCurrentQueue(featuredSongs)
    setCurrentTrack(track)
  };
```
The song tile can also be clicked which calls the ```handleAddSongToPlaylist``` function, shown below. It will send a post request to the songs controller with a specific object that details the information needed for all the attributes in the song model. If a song is added to the database successfully, the users playlists will be mapped over to find the playlist associated with the user that matches the playlist in which a song is being added, then the song will be added to the playlists songs and the user held in state will be updated with the new playlist.
```js
  // adds track to currentplaylist then updates state with the updated playlist from the backend
  function handleAddSongToPlaylist(track) {
    let songGenre = track.album.genres === null ? null : track.album.genres[0]
    fetch(`/songs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spotify_id: track.id,
        spotify_album_id: track.album.id,
        playlist_id: selectedPlaylist.id,
        spotify_artist_id: track.artists[0].id,
        featured_artist: track.artists[0].name,
        release_date: track.album.release_date,
        name: track.name,
        genre: songGenre,
        preview_url: track.preview_url,
        cover_art: track.album.images[0].url,
      })
    }).then((res) => {
      if (res.ok) {
        res.json().then((newSong) => {
          let updatedPlaylists = localUser.playlists.map((pl) => {
            if (selectedPlaylist.id === pl.id) {
              pl.songs.push(newSong)
              return pl
            } else {
              return pl
            }
          })
          setLocalUser({ ...localUser, playlists: updatedPlaylists })
          snackbarInfo.current = track.name
          setSuccessOpen(true);
        });
      } else {
        res.json().then((err) => setErrors(err.error));
      };
    });
  };
```
The create action will be fired when a ```POST``` request is sent to ```/songs```. This action will find the playlist to which a song will be added, then create an artist and album with their respective spotify_id. The ```update_artist``` and ```update_album``` functions are held in the model files and update the meta data for the album and artist using the RSpotify gem. The id of the artist and album will then be added to ```updated_song_params``` which will be used to create a new song with it's associations properly created and then send the new song to the front end which will set state with it.
```rb
# POST /songs
def create
  playlist = Playlist.find(song_params[:playlist_id])
  artist = Artist.create!(spotify_id: song_params[:spotify_artist_id])
  artist.update_artist
  album = Album.create!(
    spotify_id: song_params[:spotify_album_id],
    artist_id: artist.id
  )
  album.update_album
  updated_song_params = song_params.clone
  updated_song_params["artist_id"] = artist.id
  updated_song_params["album_id"] = album.id
  song = playlist.songs.create!(updated_song_params)
  render json: song, status: :created
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
