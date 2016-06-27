TAG=20160626
docker build -t gcr.io/nich01as-com/geiaus-web:$TAG .
gcloud docker push gcr.io/nich01as-com/geiaus-web:$TAG
# update deplouments
kubectl apply -f deploy/deployment.yaml

