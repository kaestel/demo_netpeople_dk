<?php $body_class = "front" ?>
<?php $page_title = "Netpeople" ?>
<?php include_once($_SERVER["LOCAL_PATH"]."/templates/www.header.php") ?>

<div id="maincontent" class="i:front">

	<div class="intro">
		<p>NetPeople er et kreativt bureau, der afspejler den digitale nutid. Vi tager altid udgangspunkt i den enkelte problemstilling – og tror på at kreativitet, forretningssans og teknologi skal løse denne. </p>
	</div>

	<h1>AKTUELT <span>/ Seneste nyt fra Netpeople</span></h1>
	<ul class="list">
		<li>
			<h2><a href="/news/sas-sporg-reimar">SAS - Spørg Reimar</a></h2>
		</li>
		<li>
			<h2><a href="/news/tweethletes-featured-in-creativity-online">Tweethletes featured in Creativity-online</a></h2>
		</li>
		<li>
			<h2><a href="/news/netpeople-shortlistet-i-cannes">NetPeople shortlistet i Cannes</a></h2>
		</li>
		<li>
			<h2><a href="/news/solv-og-bronze-ved-creative-circle-awards">Sølv og bronze ved Creative Circle Awards</a></h2>
		</li>
		<li>
			<h2><a href="/news/mit-tdc">Mit TDC</a></h2>
		</li>
	</ul>
</div>

<div id="sidebar">
	<div class="logo"></div>

		<div class="twitter i:twitter" id="twitter_widget_new">
			<h3>News <span class="twitter">/ Twitter</span></h3>
			<a href="http://twitter.com/WDP_DK" class="follow" target="_blank">Følg os på Twitter</a>
		</div>

		<div class="contact">
		<h3>Kontakt</h3>
		<address class="vcard company" itemscope itemtype="http://schema.org/Organization">
			<div class="name fn org" itemprop="name">NetPeople</div>
			<div class="adr" itemprop="address" itemscope itemtype="http://schema.org/Address">
				<div class="street-address" itemprop="street-address">Vester Farimagsgade 41</div>
				<div class="city"><span class="postal-code" itemprop="postal-code">1606</span> <span class="locality" itemprop="locality">København V</span></div>
				<div class="country-name" itemprop="country-name">Danmark</div>
			</div>
				<div class="tel" itemprop="tel">tel: <a href="callto:+4572215100">+45 7221 5100</a></div>
				<div class="email" itemprop="email"><a href="mailto:kontakt@wdp.dk">kontakt@wdp.dk</a></div>
		</address>
	</div>
</div>

<?php include_once($_SERVER["LOCAL_PATH"]."/templates/www.footer.php") ?>
