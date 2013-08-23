<?php $body_class = "contact" ?>
<?php $page_title = "Kontakt" ?>
<?php include_once($_SERVER["LOCAL_PATH"]."/templates/www.header.php") ?>

<div id="maincontent" class="i:contact">

	<div class="address corporate">
		<h3>Kontakt</h3>
		<div class="vcard company" itemscope itemtype="http://schema.org/Organization">
			<div class="name fn org" itemprop="name">NetPeople</div>
			<div class="adr" itemprop="address" itemscope itemtype="http://schema.org/Address">
				<div class="street-address" itemprop="street-address">Vester Farimagsgade 41</div>
				<div class="city"><span class="postal-code" itemprop="postal-code">1606</span> <span class="locality" itemprop="locality">København V</span></div>
				<div class="country-name" itemprop="country-name">Danmark</div>
			</div>
			<div class="tel" itemprop="tel"><a href="callto:+4572215100">+45 7221 5100</a></div>
			<div class="email" itemprop="email"><a href="mailto:kontakt@wdp.dk">kontakt@wdp.dk</a></div>
		</div>
		<div class="directions_holder">
			<a href="http://maps.google.dk/maps?saddr=&amp;daddr=Vester+Farimagsgade+41+1606+K%c3%b8benhavn+V" class="directions" target="_blank">Find vej</a>
		</div>
	</div>

	<div id="map_canvas"></div>

</div>

<ul class="addresses">
	<li>
		<div class="vcard person" itemscope itemtype="http://schema.org/Person">
			<div class="image">
				<img alt="Morten Hershøj" class="photo" itemprop="image" src="/attachments/people/1/dpnp_morten_frontend_small.jpg" />
			</div>
			<div class="name fn" itemprop="name">Morten Hershøj</div>
			<div class="role" itemprop="role">Adm. Direktør</div>
			<div class="tel" itemprop="tel"><a href="callto:+4522655153">+45 2265 5153</a></div>
			<div class="email" itemprop="email"><a href="mailto:mohe@dpnp.dk">mohe@dpnp.dk</a></div>
		</div>
		<ul class="tools">
			<li class="twitter"><a href="http://twitter.com/mortenhershoej" target="_blank">Twitter</a></li>
			<li class="linkedin"><a href="http://www.linkedin.com/profile/view?id=216017" target="_blank">LinkedIn</a></li>
			<li class="facebook"><a href="https://www.facebook.com/morten.hershoj" target="_blank">Facebook</a></li>
		</ul>
	</li>
	<li>
		<div class="vcard person" itemscope itemtype="http://schema.org/Person">
			<div class="image">
				<img alt="Nicole Sahl" class="photo" itemprop="image" src="/attachments/people/64/nicole_frontend_small.jpg" />
			</div>
			<div class="name fn" itemprop="name">Nicole Sahl</div>
			<div class="role" itemprop="role">Kontaktdirektør</div>
			<div class="tel" itemprop="tel"><a href="callto:+4522655168">+45 2265 5168</a></div>
			<div class="email" itemprop="email"><a href="mailto:nisa@netpeople.dk">nisa@netpeople.dk</a></div>
		</div>
		<ul class="tools">
			<li class="linkedin"><a href="http://www.linkedin.com/profile/view?id=91599230&amp;locale=en_US&amp;trk=tyah2" target="_blank">LinkedIn</a></li>
		</ul>
	</li>
	<li>
		<div class="vcard person" itemscope itemtype="http://schema.org/Person">
			<div class="image">
				<img alt="Thorkild Bjerre" class="photo" itemprop="image" src="/attachments/people/2/thorkild_ny_frontend_small.jpg" />
			</div>
			<div class="name fn" itemprop="name">Thorkild Bjerre</div>
			<div class="role" itemprop="role">Kreativ Direktør</div>
			<div class="tel" itemprop="tel"><a href="callto:+4522655215">+45 2265 5215</a></div>
			<div class="email" itemprop="email"><a href="mailto:thbj@dpnp.dk">thbj@dpnp.dk</a></div>
		</div>
		<ul class="tools">
			<li class="twitter"><a href="http://twitter.com/thorkildB" target="_blank">Twitter</a></li>
			<li class="linkedin"><a href="http://dk.linkedin.com/in/thorkildb" target="_blank">LinkedIn</a></li>
		</ul>
	</li>
</ul>

<?php include_once($_SERVER["LOCAL_PATH"]."/templates/www.footer.php") ?>
