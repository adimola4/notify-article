web: bundle exec rails server -p 3001
web: PORT=4200 yarn --cwd client start
release: bin/rake db:migrate
worker: bundle exec sidekiq  production -c 2
 