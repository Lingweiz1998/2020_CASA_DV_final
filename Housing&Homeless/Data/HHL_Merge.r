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
homeless <- read_csv("Dwelling_stock.csv",
                       locale = locale(encoding = "UTF-8"),
                       na = "n/a")

BoroughMap <- LondonBoroughs %>%
  dplyr::filter(str_detect(lad15cd, "^E09"))

data_join1 <- dplyr::left_join(x = BoroughMap, y = homeless, by = c('lad15cd'='New ONS code'))
data_join1 <- dplyr::left_join(x = data_join1, y = homeless1, by = c('lad15cd'='ONS'))
data_join1 <- dplyr::left_join(x = data_join1, y = homeless2, by = c('lad15cd'='code'))

datajo <- data_join1 %>%
  mutate(DST2004= ST2004/st_area(.)*1000)%>%
  mutate(DST2009= ST2009/st_area(.)*1000)%>%
  mutate(DST2014= ST2014/st_area(.)*1000)%>%
  mutate(DST2019= ST2019/st_area(.)*1000)%>%
  mutate(DVC2004= VC2004/st_area(.)*1000)%>%
  mutate(DVC2009= VC2009/st_area(.)*1000)%>%
  mutate(DVC2014= VC2014/st_area(.)*1000)%>%
  mutate(DVC2019= VC2019/st_area(.)*1000)
  
  
datafinal = subset(datajo,select = -c(objectid,lad15nmw,st_areashape,st_lengthshape,Borough,ST2004,ST2009,ST2014,ST2019,
                                          VC2004,VC2009,VC2014,VC2019))

datafinal <- st_drop_geometry(datafinal)

write.csv(datafinal,"homeless.csv", row.names = FALSE)



geojsonio::geojson_write(datafinal, file = "choro.geojson")



