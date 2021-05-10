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
library(tmaptools)


LondonBoroughs <- st_read("https://opendata.arcgis.com/datasets/8edafbe3276d4b56aec60991cbddda50_4.geojson")
dwellingstock <- read_csv("Dwelling_stock.csv",
                       locale = locale(encoding = "UTF-8"),
                       na = "n/a")

BoroughMap <- LondonBoroughs %>%
  dplyr::filter(str_detect(lad15cd, "^E09"))

data_join1 <- dplyr::left_join(x = BoroughMap, y = dwellingstock, by = c('lad15cd'='New ONS code'))
datafinal = subset(data_join1,select = -c(objectid,lad15nmw,st_areashape,st_lengthshape,Borough))

geojsonio::geojson_write(datafinal, file = "dwelling.geojson")



