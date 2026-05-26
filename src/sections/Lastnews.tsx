import { useState } from "react";

const coconat: React.CSSProperties = {
  fontFamily: "Coconat, Georgia, serif",
};

const commissioner: React.CSSProperties = {
  fontFamily: "Commissioner, sans-serif",
};

const NEWS = [
  {
    id: 1,
    label: "ANNONCE",
    title: "Mot de la Directrice Générale",
    description: `Chers visiteurs, chers partenaires,
C’est avec un réel plaisir que je vous souhaite la bienvenue sur le site officiel de la Société d’Exploitation et de Développement des Infrastructures du Congo (SEDIC).

À la SEDIC, nous portons la conviction profonde que le développement des infrastructures constitue l’un des piliers essentiels de la transformation économique et sociale de notre pays. Chaque jour, nos équipes se mobilisent avec passion, professionnalisme et engagement pour donner vie à des projets structurants qui façonnent le visage d’un Congo moderne, attractif et inclusif.

Notre mission s’articule autour de trois ambitions fortes : valoriser le patrimoine immobilier et culturel, stimuler les investissements et les partenariats durables, et offrir aux Congolais des espaces de vie, de loisirs et d’affaires répondant aux standards les plus élevés de qualité et d’innovation.

À travers la réalisation et l’exploitation d’infrastructures emblématiques — qu’il s’agisse des complexes hôteliers, des centres commerciaux comme le Brazza Mall, des pôles culturels tels que le Musée de l’Art et de l’histoire, ou encore des programmes de logements modernes à Mpila — nous œuvrons à créer de véritables moteurs de croissance, sources d’emplois et de dynamisme local. « Développer, exploiter, transformer. »

Nous plaçons également au cœur de nos priorités la promotion de partenariats publics-privés solides, la transparence dans notre gouvernance, et la satisfaction de nos parties prenantes. Car c’est ensemble, avec l’État, les investisseurs, les entreprises et les citoyens, que nous bâtissons des infrastructures qui traversent le temps et participent au rayonnement du Congo.

Ce site se veut une fenêtre ouverte sur nos actions, nos projets en cours et nos perspectives. Vous y trouverez des informations détaillées sur nos activités, des actualités, des appels à manifestation d’intérêt, ainsi qu’un espace de contact pour mieux nous connaître et envisager des collaborations. Je vous invite donc à parcourir nos pages, à découvrir la richesse de notre vision et à partager avec nous cette formidable aventure du développement.

Au nom de toute l’équipe de la SEDIC, je vous remercie pour l’intérêt que vous portez à notre institution et vous assure de notre entière disponibilité pour répondre à vos attentes et construire ensemble un avenir prospère pour le Congo.


Bénédicte Myriam DENGUET-ATTICKY
Directrice Générale

-`,
    photo: "/images/news_page/news_1.png",
    thumb: "/images/news_page/news_1.png",
  },
  {
    id: 2,
    label: "CULTURE",
    title: "Réception complète du Musée de l’Histoire nationale",
    description: `La SEDIC a marqué une étape importante avec la cérémonie d’ouverture du Musée de l’Histoire nationale de Mpila, un projet structurant dédié à la valorisation du patrimoine culturel et historique du Congo.

Les travaux ont été achevés à 100% et réceptionnés le 15 avril. L’ouverture au public est prévue dans les prochains mois.`,
    photo: "/images/news_page/news_2.png",
    thumb: "/images/news_page/news_2.png",
  },
  {
    id: 3,
    label: "PARTENARIAT STRATÉGIQUE",
    title: "L’enseigne Franprix s’installe à Brazza Mall",
    description: `La Société d’Exploitation et de Développement des Infrastructures du Congo (SEDIC) poursuit activement sa mission de valorisation et de dynamisation de ses infrastructures commerciales à travers la signature d’un partenariat stratégique avec l’enseigne Franprix.

La signature officielle de ce partenariat est intervenue le 25 février 2025, dans les locaux de la SEDIC, lors d’une cérémonie réunissant les deux dirigeants. Le contrat a été conclu entre Madame Bénédicte Myriam DENGUET ATTICKY, représentant la SEDIC, et Monsieur Prakash, représentant Franprix. Cette collaboration marque une nouvelle étape dans le développement et l’attractivité du Brazza Mall, l’un des pôles commerciaux majeurs de Brazzaville.

Une ouverture prévue dans les prochaines semaines
L’ouverture de Franprix au sein du Centre Commercial Brazza Mall interviendra dans les prochaines semaines. Cette implantation viendra enrichir l’offre commerciale existante et répondre aux attentes croissantes des consommateurs en matière de produits accessibles, diversifiés et de qualité.

Un partenariat au service du développement économique
À travers cette signature, la SEDIC confirme son engagement à attirer des enseignes structurantes capables de générer de la valeur ajoutée, de favoriser la création d’emplois et de participer activement à la vitalité économique locale. L’arrivée de Franprix s’inscrit pleinement dans la stratégie de développement du Brazza Mall, visant à consolider son positionnement en tant qu’espace moderne, sécurisé et compétitif, au service des commerçants et des usagers.

Une vision partagée
Ce partenariat illustre la convergence de visions entre la SEDIC et Franprix : offrir aux populations une expérience commerciale améliorée, dans un cadre attractif et conforme aux standards modernes de gestion et d’exploitation des infrastructures commerciales. La SEDIC se félicite de cette nouvelle collaboration et réaffirme sa volonté de multiplier les partenariats structurants afin de renforcer durablement la performance et la visibilité de ses infrastructures.

-`,
    photo: "/images/news_page/news_3.png",
    thumb: "/images/news_page/news_3.png",
  },
  {
    id: 4,
    label: "STRATÉGIE",
    title: "Conseil d’Administration du 23 décembre 2025",
    description: `Conseil d’Administration – des Tours Jumelles Hôtel & Résidences

Le Conseil d’administration des Tours Jumelles s’est tenu le 23 décembre dernier aux Tours Jumelles de Brazzaville.

Cette session stratégique a porté sur deux points majeurs :
la clôture de l’exercice 2024 des Tours Jumelles ;
l’adoption du budget 2026 des Tours Jumelles.

Cette étape clé traduit l’engagement constant de la SEDIC en faveur d’une gouvernance rigoureuse, d’une planification efficiente et d’un développement durable des infrastructures stratégiques de la République du Congo.

Le portefeuille d’actifs de la SEDIC comprend notamment :

les Tours Jumelles de Mpila, abritant le Business Center de Mpila ainsi que le Hilton Brazzaville – Les Tours Jumelles Hôtel & Résidences ;
le centre commercial Brazza Mall ;
le Centre international de conférences, abritant le Grand Hôtel de Kintélé ;
l’École de management de l’hôtellerie Vatel Brazzaville ;
le Musée de l’Art et de l’Histoire ;
les programmes immobiliers de Mpila (Résidences Les Jardins de Mpila, Les Pionniers, Les Balcons de Yoro et du Fleuve) ;
la résidence Les Flamboyants.

-`,
    photo: "/images/news_page/news_4.png",
    thumb: "/images/news_page/news_4.png",
  },
    {
    id: 5,
    label: "STRATÉGIE",
    title: "Conseil d’Administration du 29 août 2025",
    description: `Le Conseil d’Administration de la SEDIC s’est réuni en session ordinaire le 29 août 2025, dans le cadre de ses activités de pilotage stratégique et de supervision de la performance des entités sous sa responsabilité. Cette session a été marquée par des échanges riches et structurés autour des points clés liés à la gestion financière, aux perspectives de développement et aux partenariats stratégiques.
Des travaux structurés autour de la bonne gouvernance
Après la vérification des présences et l’approbation de l’ordre du jour, les membres du Conseil ont validé le procès-verbal de la précédente session tenue le 15 mai 2025. Le suivi de la matrice des recommandations a permis d’évaluer les progrès réalisés dans la mise en œuvre des décisions antérieures, témoignant d’un engagement constant pour la transparence et l’efficacité.
Focus sur la Société de Gestion de Brazza Mall SASU
Le Conseil a procédé à l’examen complet des éléments de gestion relatifs à l’exercice clos au 31 décembre 2024. Ont été validés :

⦁	Le rapport de gestion de l’exercice 2024,
⦁	Les états financiers audités,
⦁	Le rapport du Commissaire aux comptes, confirmant la régularité des comptes,
⦁	Le rapport d’activités du 1er semestre 2025, soulignant les dynamiques commerciales et opérationnelles en cours,
⦁	Et le budget révisé de l’exercice 2025, aligné sur les nouvelles projections.
Ces validations témoignent de la stabilité financière et de la gestion rigoureuse de la société.

Avancées notables pour VATEL SARL
Le Conseil s’est également penché sur la performance de VATEL SARL, avec l’examen des rapports d’activités de l’année 2024 et du premier semestre 2025. La validation du budget révisé pour 2025 confirme l’orientation stratégique adoptée pour assurer la croissance et la rentabilité de la société dans un contexte concurrentiel.

Informations stratégiques et projets structurants
Deux points d’information majeurs ont été présentés :

⦁	L’état d’avancement de l’évaluation des actifs de la Société d’Exploitation et de Développement des Infrastructures du Congo SAU, étape clé pour une gestion optimisée du patrimoine.

⦁	La signature officielle d’un contrat de franchise avec le Groupe Hilton, marquant la transformation du Grand Hôtel de Kintélé en DoubleTree By Hilton Kintélé. 

Ce partenariat prestigieux témoigne de l’ambition de la SEDIC à positionner le Gand hôtel de kintele comme un pôle hôtelier d’excellence en Afrique centrale.
Une dynamique de modernisation et d’ouverture
La session du 29 août 2025 s’inscrit dans une dynamique de modernisation, de professionnalisation de la gestion et d’ouverture à des partenaires internationaux de renom. Le Conseil d’Administration, par la qualité de ses délibérations, confirme sa volonté d’inscrire durablement ses structures dans une logique de performance, de transparence et de rayonnement régional.
`,
    photo: "https://res.cloudinary.com/dynpasxkm/image/upload/v1779798770/news_5_gjbabg.png",
    thumb: "https://res.cloudinary.com/dynpasxkm/image/upload/v1779798770/news_5_gjbabg.png",
  },
    {
    id: 6,
    label: "STRATÉGIE",
    title: "Signature d’un contrat de franchise entre la SEDIC et le groupe Doubletree",
    description: `Dans le cadre de sa stratégie de valorisation et de dynamisation du patrimoine hôtelier national, la Société de développement et d’exploitation des infrastructures du Congo (SEDIC) représentée par sa Directrice Générale Madame Bénédicte Myriam DENGUET ATTICKY a procédé ce lundi 21 juillet 2025, à Casablanca (Royaume du Maroc), à la signature d’un important contrat de franchise avec le groupe international HILTON

Ce partenariat a été formellement scellé en présence du Ministre d’Etat Ministre de l’aménagement du Territoire et des grands travaux Monsieur Jean Jacques BOUYA et l’Ambassadeur du Congo au Royaume du Maroc. 

Cet accord marque une étape déterminante dans le processus de transformation et de repositionnement du Grand Hôtel de Kintélé, qui opérera désormais sous l’enseigne " DoubleTree by Hilton Kintele ".

En adossant le Grand Hôtel de Kintele à une marque hôtelière de renommée mondiale, la SEDIC entend renforcer, l’exploitation, la compétitivité et l’attractivité de cette infrastructures. Ce partenariat stratégique permettra notamment : (1) de bénéficier d’un système intégré et performant d’exploitation, de commercialisation et de distribution ; (2) d’accéder à un réseau international de fidélisation et de réservation ; (3) de garantir des standards élevés de qualité, de service et de rentabilité.

Cette collaboration ouvre ainsi une nouvelle ère pour le Grand Hôtel de Kintélé, en lui offrant de nouvelles perspectives de développement sur le marché régional et international.

Cette initiative s’inscrit dans la vision du Président de la République, Chef de l’État, Son Excellence Monsieur Denis SASSOU N’GUESSO, qui accorde une attention particulière à la valorisation et pérennisation des infrastructures à vocation marchandes.
`,
    photo: "https://res.cloudinary.com/dynpasxkm/image/upload/v1779798770/news_6_qmkjb0.png",
    thumb: "https://res.cloudinary.com/dynpasxkm/image/upload/v1779798770/news_6_qmkjb0.png",
  },
    {
    id: 7,
    label: "STRATÉGIE",
    title: "Participation de la SEDIC à la Rencontre des Entrepreneurs Francophones",
    description: `La Société d’Exploitation et de Développement des Infrastructures du Congo (SEDIC) a pris part, du 26 au 28 juin 2025 à Brazzaville, à la cinquième édition de la Rencontre des Entrepreneurs Francophones (REF), un événement majeur placé sous le haut patronage de Son Excellence Monsieur Denis SASSOU N’GUESSO, Président de la République du Congo.

Cet important rendez-vous économique a réuni plus de 500 chefs d’entreprises, investisseurs, décideurs publics et experts venus des pays francophones, afin d’échanger sur les opportunités de partenariats et de co-investissements dans divers secteurs stratégiques.

À travers sa participation, la SEDIC a réaffirmé son engagement à promouvoir les projets structurants et attractifs portés par l’État congolais, notamment dans le domaine des infrastructures urbaines, hôtelières, commerciales et culturelles.
Les équipes de la SEDIC ont présenté aux partenaires présents les projets emblématiques tels que le Brazza Mall, les Tours jumelles, le Musée de l’Art, ainsi que les programmes immobiliers de Mpila, véritables leviers pour la dynamisation du tissu économique local et la création d’emplois.
Cette rencontre a également permis de renforcer les échanges avec les réseaux d’entrepreneurs francophones et d’identifier des pistes concrètes de collaboration pour le financement et la réalisation de nouveaux projets innovants au Congo.
La SEDIC, fidèle à sa mission de catalyseur du développement des infrastructures, salue l’initiative de la REF qui contribue à positionner la francophonie économique comme un espace privilégié d’affaires et de solidarité.

La SEDIC a pris part à la 5e édition de la Rencontre des Entrepreneurs Francophones à Brazzaville, un événement d’envergure qui a rassemblé décideurs et investisseurs du monde francophone. Une belle occasion de présenter nos projets structurants (Brazza Mall, Tours jumelles, Musée de l’Art, logements de Mpila) et de tisser de nouveaux partenariats pour soutenir le développement économique du Congo.`,
    photo: "https://res.cloudinary.com/dynpasxkm/image/upload/v1779798770/news_7_l9ctsl.png",
    thumb: "https://res.cloudinary.com/dynpasxkm/image/upload/v1779798770/news_7_l9ctsl.png",
  },
    {
    id: 8,
    label: "STRATÉGIE",
    title: "La SEDIC accueille 2 membres du Gouvernement en visite de terrain ",
    description: `Le 15 mai 2025, Monsieur Christian Yoka, Ministre des Finances, du Budget et du Portefeuille public, accompagné de Madame Lydie Pongault, Ministre de l’Industrie culturelle, touristique, artistique et des loisirs a effectué une visite conjointe sur trois sites emblématiques : le Musée, les Logements Yoro et le centre commercial Brazza Mall. Cette visite s’est déroulée sous la conduite de Mme Bénédicte Myriam Denguet Atticky, Directrice générale de la SEDIC. L’objectif principal de cette mission était d’évaluer la qualité des infrastructures réalisées, d’apprécier leur impact socio-économique, de s’assurer de leur conformité avec les orientations initiales, et de renforcer la coordination intersectorielle en vue de futures actions concertées
Au Musée de Mpila : La visite a débuté au Musée de l’art et de la culture de Mpila, où les deux ministres ont salué la qualité de l’infrastructure et souligné l’importance stratégique de ce site. Ils ont insisté sur le rôle que ce musée est appelé à jouer non seulement dans la promotion des actions culturelles au Congo, mais également dans le développement du quartier de Mpila et dans la dynamisation de l’économie locale. Une fois opérationnel, cet équipement culturel constituera un levier important pour la valorisation du patrimoine national.
Observations :
⦁	Les travaux de maintenance sont menés de manière satisfaisante, garantissant la préservation de l’infrastructure existante.
⦁	Le musée reste en attente des financements nécessaires à l’acquisition des équipements requis pour le lancement de ses activités. Cette étape est essentielle pour permettre l’ouverture officielle du site au public et assurer une valorisation effective du patrimoine culturel congolais.
⦁	Recommandations communes :
⦁	Renforcer la collaboration entre le Ministère de l’Industrie culturelle, touristique, artistique et des loisirs et le Ministère des Finances, du Budget et du Portefeuille public, en vue de garantir un financement durable pour l’équipement et l’opérationnalisation du musée.
⦁	Organiser une réunion de concertation réunissant le ministère de la Culture, la SEDIC, ainsi que les équipes de China Giansu, afin de définir un plan de gestion et d’exploitation à long terme du musée
Aux logements de Yoro
La délégation ministérielle a poursuivi sa visite sur le site des logements de Yoro, destinés à accueillir l’une des directions du Ministère de l’Industrie culturelle, touristique, artistique et des loisirs.
Observations :
⦁	Les logements sont achevés sur le plan architectural et disposent des équipements de base nécessaires, notamment les raccordements en eau et en électricité.
⦁	Les infrastructures sont prêtes à accueillir les équipes du ministère, sous réserve de la conclusion d’un accord financier entre la SEDIC et le Ministère des Finances pour l’occupation effective de certains locaux.
⦁	Recommandations :
⦁	Étudier la mise en place d’un mécanisme de paiement validé conjointement par la SEDIC et le Ministère des Finances, afin de faciliter l’accès aux logements par les futurs cadres du Ministère de la Culture.
⦁	Accélérer l’installation des services de proximité (sécurité, assainissement, voirie, etc.) pour garantir des conditions optimales d’occupation.

A Brazza Mall
Enfin, la délégation ministérielle s’est rendue sur le site du centre commercial Brazza Mall.
Observations :
•	Le Brazza Mall constitue un pôle de dynamisme économique, regroupant de nombreuses enseignes locales et internationales.
•	L’infrastructure respecte les normes modernes en matière de sécurité, d’accessibilité et d’hygiène.
•	Le projet présente un fort potentiel en matière de création d’emplois, tant directs qu’indirects, notamment dans les secteurs de la distribution, de la sécurité et de la restauration.
Recommandations :
•	Étudier, en concertation avec le Ministère des Finances, la possibilité de délivrer à FRANC PRIX, futur opérateur du supermarché, un document officiel l’autorisant à se conformer à la nouvelle loi de finances. Cette démarche permettrait le démarrage des opérations logistiques et la préparation des équipements nécessaires à l’ouverture du supermarché prévue d’ici la fin de l’année.
•	Envisager la mise en place de facilités fiscales temporaires afin d’encourager l’implantation et le développement du supermarché dans une perspective de stimulation économique locale.
À l’issue de cette mission, les deux ministres – et tout particulièrement M. Christian Yoka, Ministre des Finances, du Budget et du Portefeuille public – ont exprimé leur grande satisfaction quant à l’intérêt et à la portée de cette visite de terrain.
M. le Ministre a tenu à remercier chaleureusement Mme Bénédicte Myriam Denguet Atticky, Directrice générale de la SEDIC, pour le rôle déterminant qu’elle joue dans la gestion, l’exploitation et la pérennisation des infrastructures visitées.
En présence de l’Honorable Prince Bertrand Bahamboula, il a réaffirmé son engagement à soutenir les efforts en cours et a annoncé la tenue prochaine d’une rencontre avec la Direction générale de la SEDIC, prévue pour le début du mois de juin 2025, en vue de poursuivre les échanges et de consolider les perspectives de collaboration.
`,
    photo: "https://res.cloudinary.com/dynpasxkm/image/upload/v1779798770/news_8_sgmkx4.png",
    thumb: "https://res.cloudinary.com/dynpasxkm/image/upload/v1779798770/news_8_sgmkx4.png",
  },
    {
    id: 9,
    label: "STRATÉGIE",
    title: "Visite des membres de la Commission Économique et Financière de l’Assemblée Nationale à la SEDIC",
    description: `Quelques semaines après l’audition de la Directrice Générale de la SEDIC, Mme Bénédicte Myriam DENGUET ATTICKY, une délégation de la Commission Économique et Financière de l’Assemblée Nationale a effectué une visite de travail au siège de la société.
Cette mission s’inscrivait dans le cadre du suivi parlementaire des grands projets publics, notamment ceux liés au Plan National de Développement 2022-2026. Lors de cette rencontre, la délégation a échangé avec la Direction de la SEDIC sur les projets en cours, les modèles économiques, les modalités de financement et la stratégie de gestion des actifs, en particulier pour les programmes immobiliers comme Les Balcons de Mpila, Les Jardins et Les Pionniers.
Une visite guidée a permis aux députés de découvrir plusieurs initiatives phares, telles que le Brazza Mall, l’extension du Centre de Conférences de Kintélé, et le Musée de l’art et de l’histoire. Cette immersion a renforcé leur compréhension des enjeux économiques et culturels portés par la SEDIC.
Les parlementaires ont salué la transparence de la Direction et encouragé la poursuite des efforts engagés. En retour, Mme DENGUET ATTICKY a réaffirmé l’engagement de la SEDIC à contribuer activement au développement durable du pays.
`,
    photo: "https://res.cloudinary.com/dynpasxkm/image/upload/v1779798770/news_9_t1tzpf.png",
    thumb: "https://res.cloudinary.com/dynpasxkm/image/upload/v1779798770/news_9_t1tzpf.png",
  },
    {
    id: 10,
    label: "STRATÉGIE",
    title: "La participation de la SEDIC à la réunion des dirigeants du Groupe Hilton à Dubaï ",
    description: ` Mission de roadshow de la SEDIC au Maroc (24 avril – 3 mai 2025)
Une délégation conduite par Mme Bénédicte Myriam DENGUET ATTICKY, Directrice Générale de la SEDIC, a séjourné au Maroc afin de rencontrer des partenaires techniques et financiers, dans une dynamique d’optimisation et de mise en œuvre des projets structurants de la société.
Objectifs de la mission :
⦁	Étudier la faisabilité technique des projets.
⦁	Examiner les modalités de financement avec des partenaires spécialisés.
Temps forts de la mission :
⦁	Visite d’infrastructures modèles : Gare maritime de Casablanca, Aéroport de Tétouan, Port de pêche, conçus par l’architecte Zakaria ERRAFII, pressenti pour les projets congolais (Tours Jumelles de Mpila, CCIK, Brazza Mall).
⦁	Immersion industrielle : Découverte des unités de production de Jet Contractors (verre, béton fibré, menuiserie, toiles tendues).
⦁	Structuration juridique : Finalisation des contrats d’architecte avec un phasage des marchés, et consolidation des aspects juridiques.
⦁	Rencontres financières : Présentation du projet CCIK à la Wafabank, échanges sur un financement structuré, discussions autour des garanties nécessaires et du potentiel commercial.
Résultats clés :
⦁	Avancée notable dans la structuration juridique et technique des projets.
⦁	Premiers jalons posés pour un financement structuré avec Wafabank.
⦁	Meilleure connaissance des technologies industrielles adaptées aux ambitions de la SEDIC.


Cette mission au Maroc marque une étape stratégique dans la transformation des projets de la SEDIC. Elle renforce les bases d’une mise en œuvre efficace, durable et rentable, en lien avec les objectifs de développement économique et urbain du Congo. Le retour à Brazzaville ouvre une nouvelle phase active de concrétisation.
`,
    photo: "https://res.cloudinary.com/dynpasxkm/image/upload/v1779798771/news_10_anplmo.png",
    thumb: "https://res.cloudinary.com/dynpasxkm/image/upload/v1779798771/news_10_anplmo.png",
  },
    {
    id: 11,
    label: "ANNONCE",
    title: "Ouverture, Congo - Ouverture du Hilton Brazzaville Les Tours Jumelles Hotel & Residences",
    description: `Hilton a annoncé le 5 décembre l'ouverture très attendue du Hilton Brazzaville Les Tours Jumelles Hotel & Residences . Cette ouverture renforce la présence de Hilton dans la dynamique capitale congolaise.
 Hilton Brazzaville Les Tours Jumelles Hotel & Residences
30 juin 2024
Le paysage hôtelier de Brazzaville s’enrichit d’un établissement d’exception avec l’ouverture du Hilton Brazzaville Les Tours Jumelles Hotel & Residences, fruit d’un partenariat scellé en 2024 entre Hilton et la SEDIC. La signature de la convention de gestion s’est tenue en présence de M. Jean-Jacques Bouya, ministre d’État en charge de l’Aménagement du territoire et des Infrastructures, de M. Rodrigue N’Guesso, conseiller spécial du Président de la République, et de Mme Bénédicte Myriam Denguet-Atticky, directrice générale de la SEDIC.
« L’hospitalité Hilton est reconnue dans le monde entier depuis plus d’un siècle. Nous sommes heureux d’introduire cette prestigieuse enseigne pour la première fois en République du Congo », a déclaré Mme Benedicte Myriam Denguet-Atticky. « Nous avons conçu un hôtel qui répond aux besoins spécifiques du marché local, avec notamment des espaces de bureaux intégrés à la tour. Nous avons hâte d’offrir à nos clients, qu’ils viennent du Congo, d’Afrique centrale et occidentale ou d’ailleurs, une hospitalité et un service de classe mondiale, signature de Hilton. »
Culminant à près de 140 mètres, l’hôtel, installé dans la plus haute tour du pays, offre des panoramas spectaculaires sur le fleuve Congo et Kinshasa. Relié à un immeuble de bureaux dynamique, l’établissement propose 221 chambres, suites et appartements, dont certains atteignent 675 m². Véritable nouvelle destination à Brazzaville, il accueille également un restaurant tournant unique, La Brasserie Mbongui, perché sur le toit, qui promet de devenir un lieu incontournable.
Idéalement situé au cœur de la capitale, l’hôtel est à quelques minutes de l’aéroport international Maya-Maya et offre un accès privilégié aux sites emblématiques de la ville, tels que la basilique Sainte-Anne ou encore le parc de la Patte d’Oie, propice aux balades et aux rencontres culturelles.
Andreas Lackner, vice-président des opérations pour l’Afrique et l’océan Indien chez Hilton, a salué ce lancement : « Nous sommes ravis de collaborer avec la SEDIC pour introduire l’hospitalité Hilton à Brazzaville. Cette ouverture marque notre première implantation en République du Congo et nous sommes impatients d’y accueillir nos clients, qui pourront profiter d’un hébergement, d’équipements et d’expériences gastronomiques d’exception, tout en découvrant la richesse culturelle de la ville. »
Avec cet établissement de 30 étages et 136 mètres de hauteur, Hilton place la destination sur la carte mondiale du tourisme haut de gamme et donne un nouvel élan aux tours jumelles de Mpila, inaugurées en octobre 2023. Depuis près de dix ans, Brazzaville attire les grandes enseignes internationales, comme en 2015 avec l’ouverture du Pefaco Hotel Maya-Maya, face à l’aéroport, ou encore du Grand Hôtel de Kintélé au nord. Cette dynamique confirme la montée en gamme de l’offre hôtelière congolaise et positionne la capitale comme un pôle d’attractivité pour le tourisme et les affaires`,
    photo: "https://res.cloudinary.com/dynpasxkm/image/upload/v1779798771/news_11_zoi2e3.png",
    thumb: "https://res.cloudinary.com/dynpasxkm/image/upload/v1779798771/news_11_zoi2e3.png",
  },
];

export default function Lastnews() {
  const [selectedNews, setSelectedNews] = useState(NEWS[0]);

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "#efeeeb",
      }}
    >
      {/* Header */}
      <div
        className="w-full flex items-center justify-center"
        style={{
          backgroundColor: "#223078",
          padding: "22px 20px",
        }}
      >
        <h2
          style={{
            ...coconat,
            color: "white",
            fontSize: "20px",
            letterSpacing: "0.04em",
          }}
        >
          NOS DERNIÈRES ACTUALITÉS
        </h2>
      </div>

      {/* Main content */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr 1fr",
          minHeight: "610px",
        }}
      >
        {/* LEFT */}
        <div
          className="flex items-center"
          style={{
            padding: "60px",
            backgroundColor: "#efeeeb",
            height: "610px",
          }}
        >
          <div
            style={{
              maxWidth: "620px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* LABEL */}
            <div
              style={{
                display: "inline-flex",
                width: "fit-content",
                alignSelf: "flex-start",
                backgroundColor: "#223078",
                padding: "10px 20px",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  ...coconat,
                  color: "white",
                  fontSize: "20px",
                  letterSpacing: "0.05em",
                }}
              >
                {selectedNews.label}
              </span>
            </div>

            {/* TITLE */}
            <h3
              style={{
                ...coconat,
                color: "#223078",
                fontSize: "38px",
                lineHeight: "1.05",
                marginBottom: "42px",
                fontWeight: 400,
              }}
            >
              {selectedNews.title}
            </h3>

            {/* DESCRIPTION */}
            <div
              style={{
                position: "relative",
                flex: 1,
                overflow: "hidden",
              }}
            >
              {/* Scrollable content */}
              <div
                style={{
                  height: "100%",
                  overflowY: "auto",
                  paddingRight: "12px",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                className="hide-scrollbar"
              >
                <p
                  style={{
                    ...commissioner,
                    color: "#1e1e1e",
                    fontSize: "15px",
                    lineHeight: "1.7",
                    whiteSpace: "pre-line",
                    margin: 0,
                    paddingBottom: "80px",
                  }}
                >
                  {selectedNews.description}
                </p>
              </div>

              {/* Blur / fade bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "90px",
                  pointerEvents: "none",
                  background:
                    "linear-gradient(to bottom, rgba(239,238,235,0) 0%, rgba(239,238,235,0.75) 45%, rgba(239,238,235,1) 100%)",
                  backdropFilter: "blur(0.5px)",
                }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            height: "610px",
            backgroundColor: "#d9d9d9",
          }}
        >
          <img
            src={selectedNews.photo}
            alt={selectedNews.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              transition: "opacity 0.4s ease",
            }}
          />
        </div>
      </div>
{/* Bottom cards — scroll horizontal */}
<div style={{ backgroundColor: "white", padding: "18px", position: "relative" }}>
  
  {/* Flèche gauche */}
  <button
    onClick={() => {
      document.getElementById('news-scroll')?.scrollBy({ left: -300, behavior: 'smooth' });
    }}
    style={{
      position: "absolute",
      left: "0",
      top: "40%",
      transform: "translateY(-50%)",
      zIndex: 10,
      backgroundColor: "#223078",
      color: "white",
      border: "none",
      width: "40px",
      height: "60px",
      cursor: "pointer",
      fontSize: "18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    ‹
  </button>

  {/* Flèche droite */}
  <button
    onClick={() => {
      document.getElementById('news-scroll')?.scrollBy({ left: 300, behavior: 'smooth' });
    }}
    style={{
      position: "absolute",
      right: "0",
      top: "40%",
      transform: "translateY(-50%)",
      zIndex: 10,
      backgroundColor: "#223078",
      color: "white",
      border: "none",
      width: "40px",
      height: "60px",
      cursor: "pointer",
      fontSize: "18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    ›
  </button>

  {/* Scroll container */}
  <div
    id="news-scroll"
    style={{
      display: "flex",
      gap: "18px",
      overflowX: "auto",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      padding: "0 48px",
    }}
    className="hide-scrollbar"
  >
    {NEWS.map((news) => {
      const active = selectedNews.id === news.id;

      return (
        <button
          key={news.id}
          onClick={() => setSelectedNews(news)}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            textAlign: "center",
            padding: 0,
            width: "calc(25% - 14px)",
            flexShrink: 0,
          }}
        >
          {/* Thumbnail */}
          <div
            style={{
              overflow: "hidden",
              marginBottom: "14px",
              opacity: active ? 1 : 0.75,
              transition: "all 0.25s ease",
            }}
          >
            <img
              src={news.thumb}
              alt={news.title}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                transform: active ? "scale(1.02)" : "scale(1)",
                transition: "transform 0.35s ease",
              }}
            />
          </div>

          {/* Title */}
          <div
            style={{
              minHeight: "52px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "0 8px",
            }}
          >
            <p
              style={{
                ...commissioner,
                color: "#223078",
                fontSize: "15px",
                fontWeight: active ? 700 : 600,
                lineHeight: "1.35",
                maxWidth: "280px",
                margin: 0,
                textAlign: "center",
              }}
            >
              {news.title}
            </p>
          </div>
        </button>
      );
    })}
  </div>
</div>
      {/* ── Positioning ── */}
      <div className="flex flex-col items-center text-center bg-white px-20 py-16">
        {/* Label — Sous-titre-Desktop */}
        <p
          className="uppercase text-[#1e2d6b] mb-5"
          style={{
            ...coconat,
            fontSize: "20.5px",
            letterSpacing: "0.02em",
            lineHeight: "1.05",
            fontWeight: 400,
          }}
        >
          restez informés
        </p>

        {/* Body — Corps-Desktop */}
        <p
          className="max-w-2xl mb-8"
          style={{
            ...commissioner,
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: "1.30",
            letterSpacing: "0",
            color: "#222",
            textAlign: "center",
          }}
        >
          La SEDIC continue de développer de nouveaux projets et de franchir des
          étapes clés. Suivez régulièrement nos actualités pour ne rien manquer
          de nos avancées.
        </p>

        <a
          className="inline-block px-6 py-3 rounded-xl bg-[#223078] text-white hover:bg-[#B3C2E9] hover:text-[#223078] transition-all duration-300"
          href="mailto:armel.samoue@sedic.cg"
          style={{
            ...coconat,
            fontSize: "18px",
            lineHeight: "1",
            letterSpacing: "-0.02em",
          }}
        >
          Nous contacter
        </a>
      </div>
    </section>
  );
}
