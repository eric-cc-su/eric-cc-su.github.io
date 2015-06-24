=begin

RLAssembly

Author: eric-cc-su

RLAssembly (Reading List Assembly) is a command-line Ruby script to read an HTML or Markdown file of categorized links and convert it to JSON. (Because I'm lazy and automation is cool)
RLAssembly was conceived to be used alongside my GitHub Pages/Jekyll site to objectify a reading list of links to articles and websites. It is not currently (06/23/15) constructed as a Jekyll plugin.

View the README for instructions and formatting
This code is licensed under the MIT License (end of file) and under copyright by Eric Su
=end
require 'json'
require 'optparse'

filename = ""
masterhash = Hash.new
jhash = Hash.new
category = ""

def retrieve(format, line, jhash)
	category = ""
	if format == "md"
		jhash["title"] = line[1..line.index(']')-1]
		jhash["url"] = line[line.index('(')+1..line.index(')')-1]
		if line.include?(')-')  # Check if category was defined inline
			category = line[line.index(')-')+2..-1]
		end
	elsif format == "html"		
		link = line.match(/<a.+>.+(?=<\/a>)/)[0]
		jhash["title"] = link.match(/(?<=(>)).+/)[0]
		jhash["url"] = link.match(/(?<=href=["']).+(?=["']>)/)[0]
	end
	return jhash, category
end

options = {"filepath":""}
parser = OptionParser.new do |opts|
	opts.banner = "Usage: RLAssembly.rb [FILEPATH] [options]"
	opts.separator("")
	opts.separator("\tFILEPATH\t\t The path of the file to extract JSON from")
	opts.separator("")
	if ARGV.length == 0
		raise ArgumentError, "No FILEPATH defined"
	else
		filename = ARGV[0]
	end

	opts.on("-h", "--help", "Show this message") do
		puts(opts)
		exit
	end
end
parser.parse!(ARGV)

begin
	File.open(filename, 'r') do |file|
		file.each_line do |line|
			jhash = Hash.new
			if line.include?("#")
				category = line[line.rindex("#")+1..-1].strip
			elsif ( line.match(/<h\d+/) and line.match(/(class=[\s\S]+rlcat)/) )
				category = line.match(/(?<=>).+(?=<\/h\d+)/)[0]
			elsif line.strip[0] == '[' or line.include?("<li><a")  # Line contains link
				jhash, tempcat = retrieve(filename[filename.rindex(".")+1..-1].downcase, line, jhash)
				if tempcat != ""
					category = tempcat
				end
			end	

			if jhash != {}
				begin
					masterhash[category.capitalize] << jhash
				rescue  # masterhash is empty
					masterhash[category.capitalize] = [jhash]
				end
			end
		end
	end

	File.open(File.dirname(filename)+'/reading-list.json','w') do |file|
		file.write(JSON.pretty_generate(masterhash))
	end
rescue
	raise IOError, "Reading list file does not exist or is incorrectly formatted"
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