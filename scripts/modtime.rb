=begin

Author: eric-cc-su

This is a Ruby script to add a custom variable for modification time to each post's front matter.
Currently not set up as a plugin, so this will need to be executed manually.
As long as the file modification time of the file matches up with the date of the post, the script
can add or change the mtime variable.

=end

Dir.chdir("../_posts")
Dir.foreach(Dir.pwd){
    |file|
    if not ['.','..'].include?(file)
        filetime = File.ctime(file).to_s
        filedate = /(\d+-\d+-\d+)/.match(filetime)[0]
        writtendate = /(\d+-\d+-\d+)/.match(file)[0]

        if filedate == writtendate
            filehours = /\d+:\d+/.match(filetime)[0]
            mstring = "mtime: " + filehours
            charlength = 0
            fopen = false
            fmat = ""
            text = ""

            File.open(File.expand_path(file), 'r+') do |file|
                file.each_line do |line|
                    if line.include?('---') and fopen == false
                        fopen = true
                    elsif line.include?('---') and fopen == true
                        text = IO.read(file,File.size(file),charlength)
                        break
                    end

                    if line.include?("mtime: ")
                        fmat = IO.read(file, charlength)
                    end

                    charlength += line.length
                end
                if fmat == ""
                    fmat = IO.read(file, charlength)
                end

            end

            File.open(File.expand_path(file), 'w') do |file|
                file.puts(fmat)
                file.puts(mstring)
                file.puts(text)
            end
        end
    end
}