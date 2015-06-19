=begin

RLAssembly

Author: eric-cc-su

RLAssembly (Reading List Assembly) is a Ruby script to read a Markdown file of categorized links and convert it to JSON. (Because I'm lazy and automation is cool)
RLAssembly was conceived to be used alongside my GitHub Pages/Jekyll site to produce a reading list of links to articles and websites. It is not currently (06/19/15) constructed as a Jekyll plugin.

View the README for instructions and formatting
This code is licensed under the MIT License (end of file) and under copyright by Eric Su
=end
require 'json'

masterhash = Hash.new
jhash = Hash.new
category = ""
begin
	File.open('reading-list.md', 'r') do |file|
		file.each_line do |line|
			if line.include?("#")
				category = line[line.rindex("#")+1..-1].strip
			elsif line.strip[0] == '['  # Line contains link
				jhash = Hash.new
				jhash["title"] = line[1..line.index(']')-1]
				jhash["url"] = line[line.index('(')+1..line.index(')')-1]
				if line.include?(')-')  # Check if category was defined inline
					category = line[line.index(')-')+2..-1]
				end
				begin
					masterhash[category.capitalize] << jhash
				rescue
					masterhash[category.capitalize] = [jhash]
				end
			end
		end
	end

	File.open('reading-list.json','w') do |file|
		file.write(JSON.pretty_generate(masterhash))
	end
rescue
	puts("No reading-list.md file exists in the current directory")
end

=begin
The MIT License (MIT)

Copyright (c) 2015 Eric Su

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
=end