# Stock Analysis Tools
The umbrella project for various stock analysis tools written in Node.js.

Currently holds one specific script that produces the set of string keys, each bound to the stock reward and risk at specific timestamp in the past.

The keys can be used by the trade bot to open trade orders. 

The bot would select the best keys based on users inputs for min reward, max risk at init. Then it will listen the stock parameters and compute the key for current stock state. When that key is equal to the one of the best keys, it will open the order.
> UPD: This approach does not bring money, however. :)

The key is a string produced from discretized parameters of the stock state vector at that timestamp (called Experience).

Script produces the stock state vector from the set of stock moving averages taken for different periods (called Environment).

Script reads Envivironment data from the SQLite DB. It's written there by MQL5 script (https://www.mql5.com/en/docs), which is not in this repo.

Script writes produced keys into SQLite.
