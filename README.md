<h2 align="center" style="color:#4c587e">Notify Article</h2>
<p align="center"> Real-time notifications system<p>
<br/>
<p>Real-time notifications system that presents new articles from many news sites sources.
using Angular, Ruby on Rails, WebSocket, Sidekiq, deploy to Heroku.</p>
<br/>

# Live Demo
Here is a working live demo : [https://notify-articles.herokuapp.com/](https://notify-articles.herokuapp.com/)

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





