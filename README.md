<h2 align="center" style="color:#4c587e">Notify Article</h2>
<p align="center"> Real-time notifications system<p>
<br/>
<p>This project Showing solution of a real-time notifications system that presents new articles from many news sites sources.
using Angular, Ruby on Rails, WebSocket, Sidekiq, deploy to Heroku.</p>
<br/>

# Live Demo
Here is a working live demo :  

# Installation

```bash
# Install Rails at the command prompt if you haven't yet
gem install rails

# Download or clone the repo from github
git clone 

# Change directory
cd notify-articles

# Install the repo with bundle
bundle install

# Create db
rails db:create

# Run migrate
rails db:migrate

# Run seed
rails db:seed

# Run the server
rails s --port 3001

# Install sidekiq
gem install sidekiq

# Open new terminal for jobs and run
bundle exec sidekiq 

# Open new terminal for Angular app and run
cd client

# Install client dependencies
npm install 

# Start the server
ng serve

```
in your browser go to [http://localhost:4200](http://localhost:4200) 



# Solution  explanation

1. Using background-worker( <a href="https://github.com/mperham/sidekiq" style="font-style:italic;">Sidekiq</a> ) for reading new articles from sources( RSS files ) and processing the data in the server.
2. Using real-time websocket technology(<span style="font-style:italic;">Action Cable</span>) to send new articles to users.
3. When user visit the page and after finished page loading, the bell button present the number of the unread articles.
4. Bell button click will display a notifications popup with all the articles.
5. Each unread articles will started with dark background-color. when article is enterd to the "visible  area", article will be "mark" as readed, then animation will change the color to light.

<p >
<br/>

