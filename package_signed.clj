#!/usr/bin/env bb

(require '[clojure.java.shell :refer [sh]])
(require '[babashka.process :refer [shell]])

(defn get-property [property line]
  (and (str/includes? line property)
       (last (str/split line #"'"))))

(defn read-api-credentials []
  (let [secret-lines (str/split-lines (:out (sh "gopass" "show" "private/firefox.com/api-key")))]
    {:api-secret (some (partial get-property "API_SECRET") secret-lines)
     :api-key  (some (partial get-property "API_KEY") secret-lines)}))

(defn build-signed-package [{:keys [api-key api-secret]}]
  (shell "yarn" "package:signed" "--api-key" api-key "--api-secret" api-secret))

(build-signed-package (read-api-credentials))
