source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }
ruby "3.2.2"

gem "jekyll"
gem "puma"
gem "rack", "< 3"
gem "rack-jekyll", github: "adaoraul/rack-jekyll"
gem "rack-rewrite", "~> 1.5", ">= 1.5.1"
gem "rake"
gem "rouge"
gem "webrick", "~> 1.7"
gem "standard", "< 2"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
  gem "jekyll-sitemap"
  gem "jekyll-toc"
end
