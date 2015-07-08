function Deal (dealWho : String) {
	
	if (dealWho == "dealer")
	{
		timer = 0;
		PlayDealSound ();
	
		dealerHand[m] = deck[k];
		dealerHandTotal +=  GetValue (dealerHand[m].tag);
		
		var clone = Instantiate (dealerHand[m], Vector3 (1.1 + m * 0.3, 0.81, -m * 0.01), Quaternion.Euler (0,0,0));
		clone.renderer.sortingOrder = zOrder + chipOrder;
		clone.GetComponent(Card).cardOrder = m;
		zOrder++;
		
		runningCount += GetCount (deck [k].tag);
		dealerTotalScale = 1.6;
		
		realDealerTotal = dealerHandTotal % 10;
			
		//////////////////////////////////////////////////////
		
		clone.GetComponent(Card).owner = "Dealer";

		k++;
		m++;

		if (m == 2 && realDealerTotal > 7)
		{
            if (helpOn)
            {
            	if (realPlayerTotal < 8)
            	{
            		if (language == 1)
            			helpString = "Banker got a natural "+ realDealerTotal +". No more cards will be drawn.";
            	
            		else if (language == 2)
            			helpString = "La Banca ha obtenido un "+ realDealerTotal +" natural. No se pedirán más cartas.";

		        	else if (language == 3)
		        		helpString = "O Banqueiro conseguiu uma mão natural ("+ realDealerTotal +"). Não haverá mais cartas para pescar.";
		        	
		        	else if (language == 4)
		        		helpString = "<size="+screenHeight * 0.024+">Le banquier à une main naturelle égale à "+ realDealerTotal +". Il ne recevra donc aucune carte supplémentaire.</size>";
		        	
		        	else if (language == 5)
		        		helpString = "У банкира с раздачи 2-х карт выпало "+ realDealerTotal +". Карты больше не сдаются.";
		        	
		        	else if (language == 6)
		        		helpString = "庄家抽到了和为"+ realDealerTotal +"的好牌。不能继续抽牌了。";
		        	
		        	else if (language == 7)
		        		helpString = "<size="+screenHeight * 0.022+">バンカーは、"+ realDealerTotal +"点の場合はナチュラルとして、これ以上のカードは配られません。</size>";
		        	
		        	else
		        		helpString = "Kasa doğal "+ realDealerTotal +" çekti. Üçüncü kartlar çekilmeyecek.";
            	}
        		
            	else
            	{
            		if (language == 1)
            			helpString = "Banker also got a natural!";
            	
            		else if (language == 2)
            			helpString = "¡La Banca también ha obtenido un natural!";

		        	else if (language == 3)
		        		helpString = "O Banqueiro também conseguiu uma mão natural!";
		        	
		        	else if (language == 4)
		        		helpString = "Le Banquier a aussi une main naturelle!";
		        	
		        	else if (language == 5)
		        		helpString = "<size="+screenHeight * 0.023+">У банкира с раздачи двух карт также 8 или 9 (натуральная комбинация)!</size>";
		        	
		        	else if (language == 6)
		        		helpString = "庄家也抽到了好牌！";
		        	
		        	else if (language == 7)
		        		helpString = "<size="+screenHeight * 0.024+">バンカーもナチュラルを得ました！</size>";
		        	
		        	else
		        		helpString = "Kasa da doğal çekti!";
            	}

        		styleBubble.normal.background = bubbleRight;
	            helpOnScreen = 7;
	            styleBubble.fontSize = screenHeight * 0.025;
            }

			playerStand = true;
		}
			
		if (m == 3)
			Outcome ();
		
		var cards : Card[] = FindObjectsOfType(Card) as Card[];
	
		for (var card : Card in cards) {
			if (card.owner == "Dealer")
			{
				card.offset = -m * 0.15;
				card.currentCardOrder = m - 1;
			}
		}
	}
	
	else if (dealWho == "player")
	{
		timer = 0;
		playerTotalScale = 1.6;
		
		swipeStart = Vector2 (-1000, -1000);
		swipeEnd = Vector2 (-1000, -1000);
		
		PlayDealSound ();
	
		playerHand[j] = deck[k];
		playerHandTotal +=  GetValue (playerHand[j].tag);

		realPlayerTotal = playerHandTotal % 10;
		
		var cardNormal = Instantiate (playerHand[j], Vector3 (-1.1 + j * 0.3, 0.81, -j * 0.01), Quaternion.Euler(0,0,0));
		cardNormal.renderer.sortingOrder = zOrder + chipOrder;
		cardNormal.GetComponent(Card).cardOrder = j;
		zOrder++;
		
		runningCount += GetCount (deck [k].tag);
				
		k++;
		j++;
		
		var cards2 : Card[] = FindObjectsOfType(Card) as Card[];
	
		for (var card : Card in cards2) {
			if (card.owner == "Player")
			{
				card.offset = -j * 0.15;
				card.currentCardOrder = j - 1;
			}
		}
		
		if (showSwipeGesture && j == 2 && (realPlayerTotal < 17 || realPlayerTotal == 21) )
		{
			showSwipeGesture = false;
			PlayerPrefs.SetInt("SwipeGestureShown", 0);
		}
		
		if (showDoubleTap && j == 2 && realPlayerTotal > 11)
		{
			showDoubleTap = false;
			PlayerPrefs.SetInt("DoubleTapShown", 0);
		}
			
		if (j == 3 || (realPlayerTotal >= 5 && j > 1))
			playerStand = true;
		
		if (j == 2 && realPlayerTotal > 7 && helpOn)
        {
        	if (language == 1)
        		helpString = "Player got a natural " + realPlayerTotal + ". Third cards won't be drawn.";
            	
            else if (language == 2)
            	helpString = "El jugador ha obtenido un " + realPlayerTotal + " natural. No se pedirán terceras cartas.";

		    else if (language == 3)
		    	helpString = "<size="+screenHeight * 0.024+">O Jogador conseguiu uma mão natural (" + realPlayerTotal + "). Terceiras cartas não serão pescadas.</size>";
		    
		    else if (language == 4)
		    	helpString = "<size="+screenHeight * 0.023+">Le joueur à une main naturelle égale à " + realPlayerTotal + ". Il ne recevra donc pas de troisième carte.</size>";
		    
		    else if (language == 5)
		    	helpString = "У игрока с раздачи 2-х карт выпало " + realPlayerTotal + ". Третьи карты не сдаются.";
		    
		    else if (language == 6)
		    	helpString = "玩家抽到了和为"+ realPlayerTotal +"的好牌。不能继续抽第三张牌了。";
		    
		    else if (language == 7)
		    	helpString = "<size="+screenHeight * 0.023+">プレイヤーは、"+ realPlayerTotal +"点の場合はナチュラルとして、3枚目のカードは配られません。</size>";
		    
		    else
		    	helpString = "Oyuncu doğal " + realPlayerTotal + " çekti. Üçüncü kartlar çekilmeyecek.";

        	styleBubble.normal.background = bubbleLeft;
	        helpOnScreen = 7;
	        styleBubble.fontSize = screenHeight * 0.025;
        }

		dealCooldown = 0.9;
	}
	
	var cardsLeft : int = deckCount * 52 * penetrationPercentage/100 - k;
	
	if ( cardsLeft % 52 == 0)
	{
		cardLeftTimer = 3;
		deckLeftTimer = 3;
	}

	if (helpOn)
		AnalyzeSituation ();
}