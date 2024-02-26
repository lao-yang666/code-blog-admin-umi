FROM nginx:latest

# 将项目根目录下dist文件夹下的所有文件复制到镜像中 /usr/share/nginx/html/ 目录下
COPY ./ly_admin/dist/ /usr/local/nginx/www/

COPY ./ly_admin/nginx.conf /usr/local/nginx/conf/conf.d/default.conf



