import os
# os.environ["NO_PROXY"] = "*"
# os.environ["no_proxy"] = "*"
import akshare as ak
import requests

# print("HTTP_PROXY =", os.environ.get("HTTP_PROXY"))
# print("HTTPS_PROXY =", os.environ.get("HTTPS_PROXY"))
# print("http_proxy =", os.environ.get("http_proxy"))
# print("https_proxy =", os.environ.get("https_proxy"))
# print("ALL_PROXY =", os.environ.get("ALL_PROXY"))
# print("all_proxy =", os.environ.get("all_proxy"))

# url = "https://82.push2.eastmoney.com"
# print("requests proxies =", requests.utils.get_environ_proxies(url))

df = ak.stock_zh_a_spot_em()
print(df.head())
print(df.columns)
