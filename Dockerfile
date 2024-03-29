FROM ruby:3.2.2

ENV BUNDLE_PATH ./gems

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN gem install bundler:2.4.13

CMD bundle exec jekyll serve --watch --incremental --host 0.0.0.0 --port 4310
