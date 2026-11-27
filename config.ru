require "rack/jekyll"
require "rack/rewrite"

use Rack::Rewrite do
  rewrite %r{/(.+)}, lambda { |match, rack_env|
    path = rack_env["PATH_INFO"]
    target = File.exist?("_site#{path}.html") ? "#{path}.html" : path
    query = rack_env["QUERY_STRING"]
    query.nil? || query.empty? ? target : "#{target}?#{query}"
  }
end

if ENV["BASIC_AUTH_ENABLED"]
  use Rack::Auth::Basic, "Protected Area" do |username, password|
    [username, password] == ENV["BASIC_AUTH"].split(":")
  end
end

run Rack::Jekyll.new
