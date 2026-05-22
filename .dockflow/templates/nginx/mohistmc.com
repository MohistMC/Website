server {
    listen 80;
    listen [::]:80;

    server_name mohistmc.com www.mohistmc.com site.mohistmc.com;

    location / {
        proxy_intercept_errors on;

        proxy_pass http://127.0.0.1:{{ current.env.app_external_port }}/;

        proxy_connect_timeout 3s;
        proxy_read_timeout 5s;
        proxy_send_timeout 5s;

        error_page 502 503 504 = /maintenance.html;
    }

    location = /maintenance.html {
        root /var/www;
        internal;
    }

    location /maven {
        proxy_pass http://maven.mohistmc.com/;
    }

    location /api/v2 {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:2024;
    }

    location /builds-raw {
        alias /mnt/mohist-archives;
        autoindex on;
        autoindex_exact_size off;
    }

}