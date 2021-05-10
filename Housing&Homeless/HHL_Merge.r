library(dplyr)
library(tidyverse)
library(spatstat)
library(here)
library(sp)
library(rgeos)
library(maptools)
library(GISTools)
library(tmap)
library(sf)
library(geojson)
library(geojsonio)


LondonBoroughs <- st_read("https://opendata.arcgis.com/datasets/8edafbe3276d4b56aec60991cbddda50_4.geojson")
homeless <- read_csv("Homeless_accept.csv",
                       locale = locale(encoding = "UTF-8"),
                       na = "n/a")
homeless1 <- read_csv("Homeless_accept_2018.csv",
                          locale = locale(encoding = "UTF-8"),
                          na = "n/a")
homeless2 <- read_csv("Homeless_accept_2019.csv",
                          locale = locale(encoding = "UTF-8"),
                          na = "n/a")

BoroughMap <- LondonBoroughs %>%
  dplyr::filter(str_detect(lad15cd, "^E09"))

data_join1 <- dplyr::left_join(x = BoroughMap, y = homeless, by = c('lad15nm'='Borough'))
data_join1 <- dplyr::left_join(x = data_join1, y = homeless1, by = c('lad15cd'='ONS'))
data_join1 <- dplyr::left_join(x = data_join1, y = homeless2, by = c('lad15cd'='code'))

datafinal = subset(data_join1,select = -c(objectid,ONS_Code,lad15nmw,st_areashape,st_lengthshape,Borough,Name))

geojsonio::geojson_write(datafinal, file = "homeless.geojson")



