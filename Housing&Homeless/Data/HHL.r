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
homeless <- read_csv("HP.csv",
                       locale = locale(encoding = "UTF-8"),
                       na = "n/a")

BoroughMap <- LondonBoroughs %>%
  dplyr::filter(str_detect(lad15cd, "^E09"))

data_join1 <- dplyr::left_join(x = BoroughMap, y = homeless, by = c('lad15cd'='Code'))
data_join1 <- dplyr::left_join(x = data_join1, y = homeless1, by = c('lad15cd'='ONS'))
data_join1 <- dplyr::left_join(x = data_join1, y = homeless2, by = c('lad15cd'='code'))

longdata <- tidyr::gather(datafinal,Year,home,`01/01/2004`:`01/01/2020`)

  
datafinal = subset(data_join1,select = -c(objectid,lad15nmw,lad15nm,st_areashape,st_lengthshape))

datafinal <- st_drop_geometry(datafinal)

write.csv(datafinal,"homeless.csv", row.names = FALSE)



geojsonio::geojson_write(datafinal, file = "HLlong.geojson")



