{{- $config := file.Read "config.yaml" | codec.YamlDecode -}}
{{- exec (cat "cp -a static/." $config.export ) | nothing -}}
{{- execTemplate "index.html" $config | codec.StringToByte | file.Write (print $config.export "/index.html") | nothing -}}
