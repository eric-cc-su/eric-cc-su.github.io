require 'fileutils'

module CatTag
    $base = Dir.pwd #Save the project root directory
    if not $base.split("/")[-1].include?('.github')
        Dir.chdir("../")
        $base = Dir.pwd
    end

    class PostIndex < Jekyll::Generator
        def generate(site)
            @list = [] # Compilation of all blog post data
            @cat_list = check_source("blog/category") # Get current categories
            @tag_list = check_source("blog/tag") # Get current tags
            @pcat_list = [] # New categories
            @ptag_list = [] # New tags
            dpath = File.join($base, "_posts")
            Dir.foreach(dpath) {
                |file|

                if not ['.', '..'].include?(file)
                    data = Hash.new

                    onepost = open(File.join(dpath, file))
                    oneline = onepost.readline
                    if not oneline.include?('---')
                        while not oneline.include?('---') # Search for opening --- in front matter
                            oneline = onepost.readline
                        end
                    else
                        oneline = onepost.readline
                        while not oneline.include?('---') # Read front matter
                            keyval = oneline.split(":")
                            data[keyval[0].strip] = keyval[1].strip
                            oneline = onepost.readline
                        end
                    end
                    @list << data
                    onepost.close
                end
            }

            compile_post_data(@list)
            construct("category", @pcat_list)
            construct("tag", @ptag_list)
        end

        def check_source(rel_path)
            source_list = []
            dpath = File.join($base, rel_path)
            Dir.foreach(dpath) {
                |file|
                if not ['.', '..'].include?(file)
                    source_list << file.gsub(".md", "")
                end
            }
            return source_list
        end

        def compile_post_data(data_array)
            data_array.each do |item|
                if not @cat_list.include?(item['category'])
                    @pcat_list << item['category']
                end
                item['tags'].gsub("[", "").gsub("]", "").split(",").each do |subitem|
                    subitem = subitem.strip
                    if not @tag_list.include?(subitem)
                        @ptag_list << subitem
                    end
                end
            end

            def construct(type, data_array)
                dpath = File.join($base, "blog/", type)
                if not File.directory?(dpath)
                    FileUtils.mkdir_p(dpath)
                end

                ytype = type
                case type
                    when "tag"
                        ytype = "tags"
                    when "category"
                        ytype = "categories"
                end
                yfname = File.join($base, "_data/", ytype+".yml")

                data_array.each do |filename|
                    begin
                        fname = File.join(dpath, String.try_convert(filename)+".md")
                        newfile = open(fname, "w")
                        newfile.puts("---")
                        newfile.puts("layout: "+type)
                        newfile.puts(type+": "+filename)
                        newfile.puts("permalink: " + File.join("/blog", type, filename)+"/")
                        newfile.puts("---")
                        newfile.close()

                        ycfile = open(yfname, "a")
                        ycfile.puts("\n\n- slug: " + filename)
                        ycfile.write("  name: " + filename.capitalize.gsub("-", " "))
                        ycfile.close()
                    rescue
                    end
                end
            end
        end
    end
end