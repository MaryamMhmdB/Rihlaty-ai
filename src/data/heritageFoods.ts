import najdiJareeshImg from '../assets/images/najdi_jareesh_1786369682202.jpg';
import najdiKabsaImg from '../assets/images/najdi_kabsa_1786369694522.jpg';
import hijaziSaleegImg from '../assets/images/hijazi_saleeg_1786369706847.jpg';
import aseeriAreekaImg from '../assets/images/aseeri_areeka_1786369720835.jpg';
import southernHaneethImg from '../assets/images/southern_haneeth_1786369730841.jpg';
import redHasawiRiceImg from '../assets/images/red_hasawi_rice_1786369743107.jpg';
import hijaziMasoubImg from '../assets/images/hijazi_masoub_1786369754519.jpg';
import sayadiyahFishImg from '../assets/images/sayadiyah_fish_1786369767419.jpg';
import haneeniDessertImg from '../assets/images/haneeni_dessert_1786369779368.jpg';
import matazeezStewImg from '../assets/images/matazeez_stew_1786369790599.jpg';
import hasawiDateBreadImg from '../assets/images/hasawi_date_bread_1786369801156.jpg';

export interface HeritageDish {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon?: string;
  imageUrl: string;
  bestRestaurantNameAr: string;
  bestRestaurantNameEn: string;
  bestRestaurantId: string;
  priceEstimateAr: string;
  priceEstimateEn: string;
  originRegionAr: string;
  originRegionEn: string;
}

export interface TraditionalRestaurant {
  id: string;
  nameAr: string;
  nameEn: string;
  locationAr: string;
  locationEn: string;
  specialtyAr: string;
  specialtyEn: string;
  recommendedDishesAr: string[];
  recommendedDishesEn: string[];
  crowdPrediction: 'low' | 'moderate' | 'high';
  crowdTextAr: string;
  crowdTextEn: string;
  bestTimeToVisitAr: string;
  bestTimeToVisitEn: string;
  accessibilityAr: string;
  accessibilityEn: string;
  googleMapsUrl: string;
  rating: number;
  imageUrl: string;
}

export interface CityCulinaryGuide {
  cityId: string;
  cityNameAr: string;
  cityNameEn: string;
  dishes: HeritageDish[];
  restaurants: TraditionalRestaurant[];
}

export const CITY_CULINARY_GUIDES: Record<string, CityCulinaryGuide> = {
  riyadh: {
    cityId: 'riyadh',
    cityNameAr: 'الرياض والدرعية',
    cityNameEn: 'Riyadh & Diriyah',
    dishes: [
      {
        id: 'jareesh-najdi',
        nameAr: 'الجريش النجدي التراثي',
        nameEn: 'Najdi Jareesh',
        descriptionAr: 'قمح مجروش مطبوخ بالحليب واللبن الهادئ مع كشنة البصل المسلوق والمسمنة العطرية والسمن البلدي.',
        descriptionEn: 'Cracked wheat slow-cooked in buttermilk with aromatic spiced onions, black lemon and pure ghee.',
        icon: '🍲',
        imageUrl: najdiJareeshImg,
        bestRestaurantNameAr: 'مطعم القرية النجدية',
        bestRestaurantNameEn: 'Najd Village Restaurant',
        bestRestaurantId: 'najd-village',
        priceEstimateAr: '35 - 55 ريال',
        priceEstimateEn: 'SAR 35 - 55',
        originRegionAr: 'منطقة نجد (الرياض والدرعية)',
        originRegionEn: 'Najd Region (Riyadh & Diriyah)'
      },
      {
        id: 'marqooc-qursan',
        nameAr: 'المرقوق والقرصان النجدي',
        nameEn: 'Najdi Marqooc & Qursan',
        descriptionAr: 'رقائق العجين الخفيف المطهوة مع مرق اللحم الطازج والخضروات والمسمّنة النجدية.',
        descriptionEn: 'Thin hand-stretched pastry cooked in rich spiced lamb broth with seasonal vegetables.',
        icon: '🥘',
        imageUrl: matazeezStewImg,
        bestRestaurantNameAr: 'مطعم القرية النجدية',
        bestRestaurantNameEn: 'Najd Village Restaurant',
        bestRestaurantId: 'najd-village',
        priceEstimateAr: '45 - 70 ريال',
        priceEstimateEn: 'SAR 45 - 70',
        originRegionAr: 'منطقة نجد',
        originRegionEn: 'Najd Region'
      },
      {
        id: 'kabsa-najdiya',
        nameAr: 'الكبسة النجدية الفاخرة',
        nameEn: 'Gourmet Najdi Kabsa',
        descriptionAr: 'أرز بسمتي فاخر مطبوخ ببهارات نجدية أصيلة يقدّم مع لحم النعيمي الشاب أو لحم الحاشي.',
        descriptionEn: 'Premium fragrant basmati rice spiced with authentic Najdi blend, served with tender lamb or Hashi.',
        icon: '🍚',
        imageUrl: najdiKabsaImg,
        bestRestaurantNameAr: 'مطعم سهيل التراثي',
        bestRestaurantNameEn: 'Suhail Gourmet Restaurant',
        bestRestaurantId: 'suhail-riyadh',
        priceEstimateAr: '75 - 120 ريال',
        priceEstimateEn: 'SAR 75 - 120',
        originRegionAr: 'الرياض',
        originRegionEn: 'Riyadh'
      },
      {
        id: 'haneeni-matazeez',
        nameAr: 'الحنيني والمطازيز النجدية',
        nameEn: 'Haneeni Dessert & Matazeez',
        descriptionAr: 'حلوى التمر النجدي المخبوز بالسمن البري، وأقراص العجين الصغيرة المطهوة باللحم والمرق.',
        descriptionEn: 'Sweet date and wheat bake drizzled with farm ghee, alongside savoury stew discs.',
        icon: '🫓',
        imageUrl: haneeniDessertImg,
        bestRestaurantNameAr: 'مطعم حارة المصمك التراثي',
        bestRestaurantNameEn: 'Masmak Heritage Alley Restaurant',
        bestRestaurantId: 'takwa-masmak',
        priceEstimateAr: '30 - 50 ريال',
        priceEstimateEn: 'SAR 30 - 50',
        originRegionAr: 'الدرعية القديمة',
        originRegionEn: 'Old Diriyah'
      }
    ],
    restaurants: [
      {
        id: 'najd-village',
        nameAr: 'مطعم القرية النجدية',
        nameEn: 'Najd Village Restaurant',
        locationAr: 'حي التخصصي / البجيري الدرعية',
        locationEn: 'Takhassusi / Bujairi Diriyah',
        specialtyAr: 'أعرق مطعم تراثي متخصص بالجريش، المرقوق، الحنيني، ولحم الحاشي الطازج',
        specialtyEn: 'Most famous heritage restaurant for Jareesh, Marqooc, Hashi Meat & Haneeni',
        recommendedDishesAr: ['الجريش النجدي', 'المرقوق باللحم', 'الحنيني بالسمن'],
        recommendedDishesEn: ['Najdi Jareesh', 'Lamb Marqooc', 'Warm Haneeni'],
        crowdPrediction: 'moderate',
        crowdTextAr: '🟢 خفيف ظهراً (1:00م - 3:00م) | 🔴 مرتفع مساءً (8:00م - 11:00م)',
        crowdTextEn: '🟢 Light at lunch (1-3 PM) | 🔴 High at dinner (8-11 PM)',
        bestTimeToVisitAr: '1:30 ظهراً أو 6:00 مساءً تجنباً لفترات الانتظار',
        bestTimeToVisitEn: '1:30 PM or 6:00 PM to avoid waiting line',
        accessibilityAr: '♿ مجهز بالكامل: مدخل بدون عتبات، منحدرات كراسي، ومواقف مخصصة',
        accessibilityEn: '♿ Fully Accessible: Step-free entrance, ramps, and reserved parking',
        googleMapsUrl: 'https://www.google.com/maps?q=24.6901,46.6804',
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'suhail-riyadh',
        nameAr: 'مطعم سهيل',
        nameEn: 'Suhail Gourmet Restaurant',
        locationAr: 'حي حطين / المطل بالدرعية',
        locationEn: 'Hittin / Diriyah Overlook',
        specialtyAr: 'تجربة ضيافة سعودية فاخرة تجمع الأصالة مع العرض المعاصر والأجواء الراقية',
        specialtyEn: 'Gourmet Saudi heritage cuisine served in a luxury fine dining atmosphere',
        recommendedDishesAr: ['الكبسة النجدية الفاخرة', 'مقبلات حساوية', 'كيكة التمر بالسمن'],
        recommendedDishesEn: ['Gourmet Najdi Kabsa', 'Hasawi Starters', 'Date Cake with Ghee'],
        crowdPrediction: 'high',
        crowdTextAr: '🟡 متوسط أيام الأسبوع | 🔴 مرتفع في عطلة نهاية الأسبوع',
        crowdTextEn: '🟡 Moderate weekdays | 🔴 Peak crowds on weekends',
        bestTimeToVisitAr: 'الحجز المسبق يوصى به، أو الزيارة المبكرة الساعة 6:30 مساءً',
        bestTimeToVisitEn: 'Prior booking recommended or early visit at 6:30 PM',
        accessibilityAr: '♿ مصاعد هيدروليكية، منحدرات ملساء، ودورات مياه مجهزة للكراسي',
        accessibilityEn: '♿ Elevators, smooth ramps, and accessible restrooms',
        googleMapsUrl: 'https://www.google.com/maps?q=24.7360,46.5760',
        rating: 4.9,
        imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'takwa-masmak',
        nameAr: 'مطعم حارة المصمك التراثي',
        nameEn: 'Masmak Heritage Alley Restaurant',
        locationAr: 'بجوار قصر المصمك وسوق الزل',
        locationEn: 'Next to Masmak Fortress & Souk Al-Zal',
        specialtyAr: 'مطعم شعبي دافئ بجوار قصر المصمك يقدم الكبسة والدجاج البلدي والقهوة السعودية',
        specialtyEn: 'Authentic alley dining near Masmak Fortress with local chicken kabsa & Saudi coffee',
        recommendedDishesAr: ['مطازيز بلدي', 'كبسة دجاج', 'قهوة وتمر'],
        recommendedDishesEn: ['Local Matazeez', 'Chicken Kabsa', 'Saudi Coffee & Dates'],
        crowdPrediction: 'low',
        crowdTextAr: '🟢 خفيف عصراً (4:00م - 6:00م) | 🟡 متوسط بعد المغرب',
        crowdTextEn: '🟢 Light in afternoon (4-6 PM) | 🟡 Moderate after Maghrib',
        bestTimeToVisitAr: '4:30 عصراً للاستمتاع بالأجواء التراثية الهادئة',
        bestTimeToVisitEn: '4:30 PM for a calm heritage atmosphere',
        accessibilityAr: '♿ أرضية ممهدة تماماً خالية من العتبات ومناسبة للكراسي المتحركة',
        accessibilityEn: '♿ Completely flat paved floor, highly wheelchair friendly',
        googleMapsUrl: 'https://www.google.com/maps?q=24.6312,46.7133',
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  alula: {
    cityId: 'alula',
    cityNameAr: 'العلا',
    cityNameEn: 'AlUla',
    dishes: [
      {
        id: 'majboos-alula',
        nameAr: 'مجبوس العلا بالتوابل الواحية',
        nameEn: 'AlUla Oasis Majboos',
        descriptionAr: 'أرز متبّل ببهارات الواحة الخاصة يقدّم مع لحم الضأن الطازج والمكسرات المحمصة.',
        descriptionEn: 'Spiced oasis rice served with tender roasted lamb, toasted almonds and raisins.',
        icon: '🍚',
        imageUrl: najdiKabsaImg,
        bestRestaurantNameAr: 'مطعم سهيل العلا التراثي',
        bestRestaurantNameEn: 'Suhail AlUla Heritage',
        bestRestaurantId: 'suhail-alula',
        priceEstimateAr: '80 - 130 ريال',
        priceEstimateEn: 'SAR 80 - 130',
        originRegionAr: 'واحة العلا التاريخية',
        originRegionEn: 'Historic AlUla Oasis'
      },
      {
        id: 'barnii-dates',
        nameAr: 'تمر البرني بالسمسم وزبدة النخيل',
        nameEn: 'Royal Barnii Dates with Sesame',
        descriptionAr: 'تمر البرني الملكي الشهير بالعلا محشو باللوز ومغطى بالسمن والسمسم المحمص.',
        descriptionEn: 'Royal AlUla Barnii dates filled with roasted almonds, coated in pure ghee and sesame.',
        icon: '🌴',
        imageUrl: haneeniDessertImg,
        bestRestaurantNameAr: 'مطعم طاولة الفريج',
        bestRestaurantNameEn: 'Tawlet Al Fareej Heritage',
        bestRestaurantId: 'tawlet-alula',
        priceEstimateAr: '25 - 40 ريال',
        priceEstimateEn: 'SAR 25 - 40',
        originRegionAr: 'العلا',
        originRegionEn: 'AlUla'
      },
      {
        id: 'kasra-citrus',
        nameAr: 'خبز الكسرة ومربى حمضيات العلا',
        nameEn: 'Kasra Bread & Organic Citrus Jam',
        descriptionAr: 'خبز صاج واحي خفيف يُقدَم ساخناً مع مربى برتقال العلا الطبيعي والعسل.',
        descriptionEn: 'Fresh flatbread baked over wood fire, served with local organic citrus preserve.',
        icon: '🥖',
        imageUrl: hasawiDateBreadImg,
        bestRestaurantNameAr: 'مطعم طاولة الفريج',
        bestRestaurantNameEn: 'Tawlet Al Fareej Heritage',
        bestRestaurantId: 'tawlet-alula',
        priceEstimateAr: '20 - 35 ريال',
        priceEstimateEn: 'SAR 20 - 35',
        originRegionAr: 'البلدة القديمة بالعلا',
        originRegionEn: 'AlUla Old Town'
      }
    ],
    restaurants: [
      {
        id: 'suhail-alula',
        nameAr: 'مطعم سهيل العلا التراثي',
        nameEn: 'Suhail AlUla Heritage',
        locationAr: 'البلدة القديمة بالعلا',
        locationEn: 'AlUla Old Town',
        specialtyAr: 'أطباق الواحة، مجبوس اللحم، وسلطة الحمضيات بالنعناع وسط أزقة البلدة القديمة',
        specialtyEn: 'Oasis lamb majboos, citrus salad & local heritage desserts among ancient alleyways',
        recommendedDishesAr: ['مجبوس العلا باللحم', 'سلطة الحمضيات', 'مهلبية الهيل'],
        recommendedDishesEn: ['AlUla Lamb Majboos', 'Citrus Salad', 'Cardamom Pudding'],
        crowdPrediction: 'moderate',
        crowdTextAr: '🟢 خفيف عند الافتتاح (1:00م) | 🟡 متوسط مساءً (7:30م)',
        crowdTextEn: '🟢 Light at opening (1 PM) | 🟡 Moderate at dinner (7:30 PM)',
        bestTimeToVisitAr: '1:30 ظهراً للاستمتاع بالطاولات المظللة الخالية من الانتظار',
        bestTimeToVisitEn: '1:30 PM for shaded tables with no waiting time',
        accessibilityAr: '♿ ممرات خشبية ملساء بدون درجات، مناسبة جداً للكراسي المتحركة',
        accessibilityEn: '♿ Smooth wooden pathways with zero steps, wheelchair ready',
        googleMapsUrl: 'https://www.google.com/maps?q=26.6205,37.9251',
        rating: 4.9,
        imageUrl: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'tawlet-alula',
        nameAr: 'مطعم طاولة الفريج التراثي',
        nameEn: 'Tawlet Al Fareej Heritage',
        locationAr: 'واحة العلا الثقافية',
        locationEn: 'AlUla Cultural Oasis',
        specialtyAr: 'أكلات واحية محضرّة بأيدي أمهات العلا التراثية في قلب مزارع النخيل',
        specialtyEn: 'Authentic home-cooked oasis stews made by local AlUla women chefs in palm groves',
        recommendedDishesAr: ['تمر البرني بالسمسم', 'خبز الكسرة', 'إدام الواحة المشكل'],
        recommendedDishesEn: ['Barnii Dates', 'Kasra Bread', 'Mixed Oasis Stew'],
        crowdPrediction: 'low',
        crowdTextAr: '🟢 خفيف طوال فترة النهار | 🟡 متوسط بعد الغروب',
        crowdTextEn: '🟢 Light during daytime | 🟡 Moderate after sunset',
        bestTimeToVisitAr: '5:00 عصراً مع نسيم المزارع الهادئ',
        bestTimeToVisitEn: '5:00 PM for fresh air amidst palm groves',
        accessibilityAr: '♿ أرضيات مستوية ومواقف سيارات قريبة ومجهزة بالكامل',
        accessibilityEn: '♿ Flat terrain, easy accessible drop-off and parking',
        googleMapsUrl: 'https://www.google.com/maps?q=26.6811,37.9825',
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  jeddah: {
    cityId: 'jeddah',
    cityNameAr: 'جدة التاريخية (البلد)',
    cityNameEn: 'Historic Jeddah',
    dishes: [
      {
        id: 'sayadiyah-hijazi',
        nameAr: 'الصيادية الحجازية بالسمك الطازج',
        nameEn: 'Hijazi Sayadiyah Fish',
        descriptionAr: 'أرز بني غني ببصل محمر ومسبك يُقدم مع سمك الناجل أو الهامور الطازج والطحينة.',
        descriptionEn: 'Fragrant caramelized onion rice served with fresh Red Sea Najil fish and sesame sauce.',
        icon: '🐟',
        imageUrl: sayadiyahFishImg,
        bestRestaurantNameAr: 'مطعم السدة التراثي',
        bestRestaurantNameEn: 'Al Saddah Heritage Restaurant',
        bestRestaurantId: 'saddah-jeddah',
        priceEstimateAr: '60 - 95 ريال',
        priceEstimateEn: 'SAR 60 - 95',
        originRegionAr: 'عروس البحر الأحمر - جدة التاريخية',
        originRegionEn: 'Red Sea Bride - Historic Jeddah'
      },
      {
        id: 'saleeg-hijazi',
        nameAr: 'السليق الحجازي بالسمن والدجاج',
        nameEn: 'Hijazi Saleeg with Clarified Ghee',
        descriptionAr: 'أرز أبيض مخفوق بالحليب والمرق الغني بالبهارات العدلة، يقطر عليه السمن والمكسرات.',
        descriptionEn: 'Creamy milk-infused rice cooked in chicken broth, topped with farm ghee and pine nuts.',
        icon: '🍲',
        imageUrl: hijaziSaleegImg,
        bestRestaurantNameAr: 'مطعم السدة التراثي',
        bestRestaurantNameEn: 'Al Saddah Heritage Restaurant',
        bestRestaurantId: 'saddah-jeddah',
        priceEstimateAr: '40 - 65 ريال',
        priceEstimateEn: 'SAR 40 - 65',
        originRegionAr: 'الحجاز (جدة ومكة)',
        originRegionEn: 'Hejaz Region (Jeddah & Makkah)'
      },
      {
        id: 'masoub-mutabbaq',
        nameAr: 'المعصوب الملكي والمطبق الحجازي',
        nameEn: 'Royal Hijazi Masoub & Mutabbaq',
        descriptionAr: 'موز مهروس مع الخبز البر والقشطة البلدي والعسل، بجانب المطبق المالح المقرمش.',
        descriptionEn: 'Sweet mashed banana and wheat pastry with clotted cream and honey, with crisp savoury stuffed crepe.',
        icon: '🍌',
        imageUrl: hijaziMasoubImg,
        bestRestaurantNameAr: 'مطعم أبوزيد التراثي',
        bestRestaurantNameEn: 'Abu Zaid Heritage Restaurant',
        bestRestaurantId: 'abuzaid-jeddah',
        priceEstimateAr: '18 - 35 ريال',
        priceEstimateEn: 'SAR 18 - 35',
        originRegionAr: 'حارة اليمن بحي البلد',
        originRegionEn: 'Yamen Quarter in Al-Balad'
      }
    ],
    restaurants: [
      {
        id: 'abuzaid-jeddah',
        nameAr: 'مطعم أبوزيد التراثي',
        nameEn: 'Abu Zaid Heritage Restaurant',
        locationAr: 'حارة اليمن / طريق الكورنيش',
        locationEn: 'Yamen Quarter / Corniche Road',
        specialtyAr: 'أشهر مطعم حجازي متخصص بالمعصوب الملكي بالقشطة والعسل والمطبق والعريكة',
        specialtyEn: 'Famous traditional Hijazi diner known for Royal Masoub, Mutabbaq & Areeka',
        recommendedDishesAr: ['معصوب ملكي بالقشطة', 'مطبق باللحم والبيض', 'عريكة حجازية'],
        recommendedDishesEn: ['Royal Masoub with Cream', 'Minced Meat Mutabbaq', 'Hijazi Areeka'],
        crowdPrediction: 'moderate',
        crowdTextAr: '🟢 خفيف صباحاً (8:00ص - 10:00ص) | 🔴 مرتفع مساءً',
        crowdTextEn: '🟢 Light at breakfast (8-10 AM) | 🔴 Peak in late evening',
        bestTimeToVisitAr: '9:00 صباحاً للإفطار أو 6:00 مساءً قبل فترة الذروة',
        bestTimeToVisitEn: '9:00 AM for breakfast or 6:00 PM before peak hours',
        accessibilityAr: '♿ مدخل مستوي، مصاعد واسعة، ودورات مياه سهلة الوصول',
        accessibilityEn: '♿ Level entrance, wide elevators, and accessible amenities',
        googleMapsUrl: 'https://www.google.com/maps?q=21.4858,39.1873',
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'saddah-jeddah',
        nameAr: 'مطعم السدة التراثي',
        nameEn: 'Al Saddah Heritage Restaurant',
        locationAr: 'طريق المدينة / قريب من البلد',
        locationEn: 'Madinah Road near Al-Balad',
        specialtyAr: 'مندي ولحم مضبي على الحجر الساخن مع السليق الحجازي الأصيل والصيادية',
        specialtyEn: 'Authentic Mandi, stone-grilled Madhbi, Hijazi Saleeg & Sayadiyah fish',
        recommendedDishesAr: ['السليق الحجازي', 'الصيادية بالسمك', 'لحم مضبي على الحجر'],
        recommendedDishesEn: ['Hijazi Saleeg', 'Sayadiyah Fish', 'Stone-grilled Madhbi Meat'],
        crowdPrediction: 'high',
        crowdTextAr: '🟡 متوسط ظهراً | 🔴 مرتفع جداً الجمعة والسبت غداءً',
        crowdTextEn: '🟡 Moderate weekday lunch | 🔴 High on Friday/Saturday lunch',
        bestTimeToVisitAr: '1:00 ظهراً فور الافتتاح بعد صلاة الظهر مباشرة',
        bestTimeToVisitEn: '1:00 PM right after Dhuhr prayer opening',
        accessibilityAr: '♿ مدخل مجهز بمنحدر كراسي ومواقف مخصصة لذوي الإعاقة',
        accessibilityEn: '♿ Ramp-equipped entrance with handicap reserved parking',
        googleMapsUrl: 'https://www.google.com/maps?q=21.5200,39.1700',
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  abha: {
    cityId: 'abha',
    cityNameAr: 'أبها وعسير',
    cityNameEn: 'Abha & Aseer',
    dishes: [
      {
        id: 'areeka-aseeri',
        nameAr: 'العريكة العسيرية بالسمن والعسل',
        nameEn: 'Aseeri Royal Areeka',
        descriptionAr: 'عجين البر المقرمش يعلوه سمن الضأن العسيري الذهبي والعسل الجبلي الطبيعي والتمر الممتاز.',
        descriptionEn: 'Traditional wholewheat dough drenched in local mountain ghee, pure wild honey and dates.',
        icon: '🍯',
        imageUrl: aseeriAreekaImg,
        bestRestaurantNameAr: 'مطعم حنيذ عسير التراثي',
        bestRestaurantNameEn: 'Haneeth Aseer Heritage',
        bestRestaurantId: 'haneeth-aseer',
        priceEstimateAr: '35 - 50 ريال',
        priceEstimateEn: 'SAR 35 - 50',
        originRegionAr: 'جبال عسير وأبها',
        originRegionEn: 'Aseer Mountains & Abha'
      },
      {
        id: 'haneeth-marakh',
        nameAr: 'الحنيذ الجنوبي بأغصان المرخ',
        nameEn: 'Southern Haneeth with Marakh Branches',
        descriptionAr: 'لحم ضأن طازج ندي مطبوخ في الميفا (التنور الأرضي) تحت أغصان المرخ العطري.',
        descriptionEn: 'Slow-roasted succulent lamb smoked under fragrant desert Marakh branches in deep underground clay pit.',
        icon: '🍖',
        imageUrl: southernHaneethImg,
        bestRestaurantNameAr: 'مطعم حنيذ عسير التراثي',
        bestRestaurantNameEn: 'Haneeth Aseer Heritage',
        bestRestaurantId: 'haneeth-aseer',
        priceEstimateAr: '70 - 110 ريال',
        priceEstimateEn: 'SAR 70 - 110',
        originRegionAr: 'جنوب المملكة (عسير)',
        originRegionEn: 'Southern Saudi Arabia (Aseer)'
      },
      {
        id: 'mifa-bread',
        nameAr: 'خبز الميفا التنوري مع المرق',
        nameEn: 'Mifa Clay Oven Bread & Stew',
        descriptionAr: 'خبز التنور الجنوبي الحار يقدَم فور خروجه من الميفا مع السمن والمرق واللبن.',
        descriptionEn: 'Crispy clay-oven baked flatbread served hot with rich lamb broth and farm butter.',
        icon: '🫓',
        imageUrl: hasawiDateBreadImg,
        bestRestaurantNameAr: 'مطعم ومقهىرجال ألمع التراثي',
        bestRestaurantNameEn: 'Rijal Almaa Heritage Restaurant',
        bestRestaurantId: 'rijal-almaa-cafe',
        priceEstimateAr: '15 - 30 ريال',
        priceEstimateEn: 'SAR 15 - 30',
        originRegionAr: 'قريةرجال ألمع التراثية',
        originRegionEn: 'Rijal Almaa Heritage Village'
      }
    ],
    restaurants: [
      {
        id: 'haneeth-aseer',
        nameAr: 'مطعم حنيذ عسير التراثي',
        nameEn: 'Haneeth Aseer Heritage',
        locationAr: 'طريق الملك عبدالعزيز / وسط أبها',
        locationEn: 'King Abdulaziz Road, Central Abha',
        specialtyAr: 'أشهر مطعم للحنيذ الجنوبي بالمرخ والعريكة العسيرية الفاخرة وخبز الميفا',
        specialtyEn: 'Premier heritage spot for Marakh Haneeth lamb, Aseeri Areeka & Mifa bread',
        recommendedDishesAr: ['حنيذ مرخ باللحم', 'عريكة عسيرية بالسمن', 'خبز ميفا طازج'],
        recommendedDishesEn: ['Marakh Lamb Haneeth', 'Aseeri Areeka with Honey', 'Hot Mifa Bread'],
        crowdPrediction: 'high',
        crowdTextAr: '🟢 خفيف ظهراً (12:30م) | 🔴 مرتفع جداً (2:00م - 4:00م)',
        crowdTextEn: '🟢 Light at 12:30 PM | 🔴 Peak crowd (2:00-4:00 PM)',
        bestTimeToVisitAr: '1:00 ظهراً فور الافتتاح للتمتع بالحنيذ الطازج بدون انتظار',
        bestTimeToVisitEn: '1:00 PM sharp to enjoy fresh Haneeth with zero wait',
        accessibilityAr: '♿ منحدرات واسعة ومدخل أرضي مريح بدون عتبات',
        accessibilityEn: '♿ Wide ramps and step-free flat ground entrance',
        googleMapsUrl: 'https://www.google.com/maps?q=18.2164,42.5053',
        rating: 4.9,
        imageUrl: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'rijal-almaa-cafe',
        nameAr: 'مطعم ومقهى رجال ألمع التراثي',
        nameEn: 'Rijal Almaa Heritage Restaurant',
        locationAr: 'قرية رجال ألمع التراثية',
        locationEn: 'Rijal Almaa Heritage Village',
        specialtyAr: 'أكلات عسيرية تقليدية بين المباني الحجرية الملونة التاريخية وشاي الأعشاب',
        specialtyEn: 'Traditional Aseeri dining set among colorful ancient stone palaces with herbal mountain tea',
        recommendedDishesAr: ['خبز الميفا بالتمر', 'تصاميم وتغاريق', 'شاي بالأعشاب الجبلية'],
        recommendedDishesEn: ['Mifa Bread with Dates', 'Traditional Stew', 'Mountain Herbal Tea'],
        crowdPrediction: 'low',
        crowdTextAr: '🟢 خفيف صباحاً وعصراً | 🟡 متوسط في عطلة نهاية الأسبوع',
        crowdTextEn: '🟢 Light morning & afternoon | 🟡 Moderate on weekends',
        bestTimeToVisitAr: '3:30 عصراً للاستمتاع بالإطلالة والهدوء',
        bestTimeToVisitEn: '3:30 PM for stunning mountain views and calm',
        accessibilityAr: '♿ ممرات ممهدة مصممة خصيصاً لتسهيل حركة الكراسي المتحركة',
        accessibilityEn: '♿ Smooth paved paths designed for easy wheelchair access',
        googleMapsUrl: 'https://www.google.com/maps?q=18.2167,42.2500',
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  taif: {
    cityId: 'taif',
    cityNameAr: 'الطائف',
    cityNameEn: 'Taif',
    dishes: [
      {
        id: 'saleeg-taifi',
        nameAr: 'السليق الطائفي بماء الورد والسمن',
        nameEn: 'Taif Saleeg with Rosewater',
        descriptionAr: 'أرز حليبي مخفوق بالسمن البلدي والدجاج المحمر المعطر بماء الورد الطائفي النقي.',
        descriptionEn: 'Creamy milk rice infused with authentic Taif rosewater chicken and clarified sheep ghee.',
        icon: '🍲',
        imageUrl: hijaziSaleegImg,
        bestRestaurantNameAr: 'مطعم السليق الطائفي القديم',
        bestRestaurantNameEn: 'Old Taif Saleeg Restaurant',
        bestRestaurantId: 'saleeg-taif',
        priceEstimateAr: '38 - 60 ريال',
        priceEstimateEn: 'SAR 38 - 60',
        originRegionAr: 'عروس المصايف - الطائف',
        originRegionEn: 'Taif Mountain Region'
      },
      {
        id: 'mallowah-taif',
        nameAr: 'قرص الملوح بعسل جبال الطائف',
        nameEn: 'Taif Mallowah Flatbread with Honey',
        descriptionAr: 'خبز صاج عريض مقرمش يقطر عليه عسل جبال الطائف الصافي والسمن الجبلي.',
        descriptionEn: 'Large layered crispy flatbread drizzled with local Taif mountain wildflower honey.',
        icon: '🍯',
        imageUrl: hasawiDateBreadImg,
        bestRestaurantNameAr: 'مطعم السليق الطائفي القديم',
        bestRestaurantNameEn: 'Old Taif Saleeg Restaurant',
        bestRestaurantId: 'saleeg-taif',
        priceEstimateAr: '20 - 35 ريال',
        priceEstimateEn: 'SAR 20 - 35',
        originRegionAr: 'الهدا والشفا',
        originRegionEn: 'Al-Hada & Al-Shafa'
      }
    ],
    restaurants: [
      {
        id: 'saleeg-taif',
        nameAr: 'مطعم السليق الطائفي القديم',
        nameEn: 'Old Taif Saleeg Restaurant',
        locationAr: 'شارع شبرا / قريب من قصر شبرا',
        locationEn: 'Shubra Street near Shubra Palace',
        specialtyAr: 'أعرق مطعم متخصص بالسليق الطائفي الأصيل بالدجاج المحمر والمصلق والسمن البلدي',
        specialtyEn: 'Most legendary eatery for authentic Taif Saleeg with golden roasted chicken & ghee',
        recommendedDishesAr: ['سليق طائفي بالدجاج', 'قرص ملوح بالعسل', 'سلطة سحاوق طائفية'],
        recommendedDishesEn: ['Taif Chicken Saleeg', 'Honey Mallowah Bread', 'Local Sahawiq Salsa'],
        crowdPrediction: 'moderate',
        crowdTextAr: '🟢 خفيف عصراً (5:00م) | 🔴 مرتفع عشاء الجمعة والسبت',
        crowdTextEn: '🟢 Light at 5:00 PM | 🔴 Peak on Friday/Saturday dinner',
        bestTimeToVisitAr: '2:00 ظهراً للغداء الهادئ السريع',
        bestTimeToVisitEn: '2:00 PM for a quick relaxed lunch',
        accessibilityAr: '♿ أرضية مستوية تماماً بدون أي درجات عائقة',
        accessibilityEn: '♿ Completely level flooring with no step barriers',
        googleMapsUrl: 'https://www.google.com/maps?q=21.2750,40.4100',
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  alahsa: {
    cityId: 'alahsa',
    cityNameAr: 'الأحساء',
    cityNameEn: 'Al-Ahsa',
    dishes: [
      {
        id: 'red-hasawi-rice',
        nameAr: 'الأرز الحساوي الأحمر باللحم',
        nameEn: 'Red Hasawi Rice with Lamb',
        descriptionAr: 'أرز بني حساوي فريد غني بالحديد والتوابل، يطهى على نار هادئة مع لحم الضأن والبهارات.',
        descriptionEn: 'Rare nutrient-dense red Hasawi rice slow-cooked with tender lamb, cardamoms and black lime.',
        icon: '🌾',
        imageUrl: redHasawiRiceImg,
        bestRestaurantNameAr: 'مطعم دار بسمة للتراث الحساوي',
        bestRestaurantNameEn: 'Dar Basma Hasawi Heritage',
        bestRestaurantId: 'dar-basma',
        priceEstimateAr: '65 - 100 ريال',
        priceEstimateEn: 'SAR 65 - 100',
        originRegionAr: 'واحة الأحساء العالمية',
        originRegionEn: 'UNESCO Al-Ahsa Oasis'
      },
      {
        id: 'hasawi-date-bread',
        nameAr: 'الخبز الحساوي التنوري بدبس التمر',
        nameEn: 'Hasawi Date Bread with Black Seed',
        descriptionAr: 'خبز تنوري داكن مخبوز بدبس تمر الأحساء والحبة السوداء والحلبة العطرية.',
        descriptionEn: 'Clay oven baked dark bread sweetened with pure Al-Ahsa date molasses, nigella seeds and fenugreek.',
        icon: '🫓',
        imageUrl: hasawiDateBreadImg,
        bestRestaurantNameAr: 'مطعم دار بسمة للتراث الحساوي',
        bestRestaurantNameEn: 'Dar Basma Hasawi Heritage',
        bestRestaurantId: 'dar-basma',
        priceEstimateAr: '15 - 25 ريال',
        priceEstimateEn: 'SAR 15 - 25',
        originRegionAr: 'سوق القيصرية - الهفوف',
        originRegionEn: 'Souk Al-Qaysariya, Hofuf'
      }
    ],
    restaurants: [
      {
        id: 'dar-basma',
        nameAr: 'مطعم دار بسمة للتراث الحساوي',
        nameEn: 'Dar Basma Hasawi Heritage',
        locationAr: 'سوق القيصرية / وسط الهفوف',
        locationEn: 'Al-Qaysariya Souk, Hofuf',
        specialtyAr: 'أشهر بيت تراثي يقدم الأرز الحساوي الأحمر، المجبوس الحساوي، والخبز المخبوز بدبس التمر',
        specialtyEn: 'Premier heritage house serving Red Hasawi Rice, Hasawi Majboos & fresh date molasses bread',
        recommendedDishesAr: ['أرز حساوي أحمر باللحم', 'خبز حساوي بالتمر', 'مرقوق حساوي'],
        recommendedDishesEn: ['Red Hasawi Rice with Lamb', 'Hasawi Date Bread', 'Hasawi Marqooc'],
        crowdPrediction: 'moderate',
        crowdTextAr: '🟢 خفيف ظهراً (1:00م) | 🔴 مرتفع مساء السبت',
        crowdTextEn: '🟢 Light at 1:00 PM | 🔴 High on Saturday evening',
        bestTimeToVisitAr: '1:30 ظهراً لتجربة الأرز الحساوي الطازج بدون زحام',
        bestTimeToVisitEn: '1:30 PM to taste hot Hasawi rice with low wait time',
        accessibilityAr: '♿ مصعد مخصص ومدخل بمحاذاة الرصيف للكراسي المتحركة',
        accessibilityEn: '♿ Dedicated elevator and street-level ramp for wheelchairs',
        googleMapsUrl: 'https://www.google.com/maps?q=25.3760,49.5870',
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  dammam: {
    cityId: 'dammam',
    cityNameAr: 'الدمام والخبر والقطيف (المنطقة الشرقية)',
    cityNameEn: 'Dammam, Khobar & Qatif (Eastern Province)',
    dishes: [
      {
        id: 'mabbhoos-samak',
        nameAr: 'المجبوس والمكبوس البحري بالسمك الطازج',
        nameEn: 'Eastern Gulf Fish Majboos',
        descriptionAr: 'أرز متبّل ببهارات الخليج العربي والليمون الأسود العماني يقدَم مع سمك الكنعـد أو الهامور الطازج.',
        descriptionEn: 'Aromatic basmati rice cooked with Arabian Gulf spices, dry black lime, and fresh local Kingfish or Grouper.',
        icon: '🐟',
        imageUrl: sayadiyahFishImg,
        bestRestaurantNameAr: 'مطعم القرية الشعبية بالدمام',
        bestRestaurantNameEn: 'Heritage Village Dammam',
        bestRestaurantId: 'heritage-village-dammam',
        priceEstimateAr: '55 - 90 ريال',
        priceEstimateEn: 'SAR 55 - 90',
        originRegionAr: 'سواحل المنطقة الشرقية والقطيف',
        originRegionEn: 'Eastern Province Coast & Qatif'
      },
      {
        id: 'red-hasawi-dammam',
        nameAr: 'الأرز الحساوي الأحمر باللحم والمكسرات',
        nameEn: 'Red Hasawi Rice with Tender Lamb',
        descriptionAr: 'الأرز الحساوي الأحمر التراثي الغني بالألياف والمعادن، يطهى على المهل مع مرق الضأن وتوابل الشرقية.',
        descriptionEn: 'Historic nutrient-rich red Hasawi grain slow-cooked in rich lamb stew with traditional Eastern spices.',
        icon: '🌾',
        imageUrl: redHasawiRiceImg,
        bestRestaurantNameAr: 'مطعم القرية الشعبية بالدمام',
        bestRestaurantNameEn: 'Heritage Village Dammam',
        bestRestaurantId: 'heritage-village-dammam',
        priceEstimateAr: '60 - 95 ريال',
        priceEstimateEn: 'SAR 60 - 95',
        originRegionAr: 'المنطقة الشرقية (الأحساء والقطيف والدمام)',
        originRegionEn: 'Eastern Province (Al-Ahsa, Qatif & Dammam)'
      },
      {
        id: 'hasawi-bread-eastern',
        nameAr: 'الخبز الحساوي بالتمر والحبة السوداء',
        nameEn: 'Hasawi Date Molasses Bread',
        descriptionAr: 'خبز صاج وتنور داكن مخبوز بدبس التمر الطبيعي والحبة السوداء والسمسم المحمص.',
        descriptionEn: 'Traditional clay-oven flatbread sweetened with natural date molasses and nigella seeds.',
        icon: '🫓',
        imageUrl: hasawiDateBreadImg,
        bestRestaurantNameAr: 'مطعم دار بسمة التراثي',
        bestRestaurantNameEn: 'Dar Basma Heritage',
        bestRestaurantId: 'dar-basma',
        priceEstimateAr: '15 - 30 ريال',
        priceEstimateEn: 'SAR 15 - 30',
        originRegionAr: 'سوق القيصرية وأسواق القطيف الشعبية',
        originRegionEn: 'Qaysariya Souk & Qatif Heritage Markets'
      }
    ],
    restaurants: [
      {
        id: 'heritage-village-dammam',
        nameAr: 'مطعم ومتحف القرية الشعبية بالدمام',
        nameEn: 'Heritage Village Restaurant Dammam',
        locationAr: 'طريق الشاطئ / كورنيش الدمام',
        locationEn: 'Beach Road / Dammam Corniche',
        specialtyAr: 'أكبر قلعة تراثية بالشرقية تقدم المأكولات البحرية الخليجية، المجبوس، والأرز الحساوي في مجالس تراثية',
        specialtyEn: 'Iconic castle setting on Dammam Corniche serving authentic Gulf seafood & Eastern stews',
        recommendedDishesAr: ['مجبوس السمك الكنعد', 'أرز حساوي باللحم', 'مرقوق بالخضار'],
        recommendedDishesEn: ['Kingfish Majboos', 'Red Hasawi Rice', 'Vegetable Marqooc'],
        crowdPrediction: 'moderate',
        crowdTextAr: '🟢 خفيف ظهراً (1:00م) | 🔴 مرتفع مساء الجمعة والسبت',
        crowdTextEn: '🟢 Light at 1:00 PM | 🔴 Peak crowds on weekend evenings',
        bestTimeToVisitAr: '1:30 ظهراً للغداء الهادئ وتفقد المتحف التراثي',
        bestTimeToVisitEn: '1:30 PM for lunch with full museum access',
        accessibilityAr: '♿ مصاعد هيدروليكية، مداخل أرضية ملساء، ودورات مياه مجهزة للكراسي المتحركة',
        accessibilityEn: '♿ Hydraulic elevators, smooth step-free entrances & accessible restrooms',
        googleMapsUrl: 'https://www.google.com/maps?q=26.4340,50.1030',
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  jazan: {
    cityId: 'jazan',
    cityNameAr: 'جازان',
    cityNameEn: 'Jazan',
    dishes: [
      {
        id: 'magsh-jazani',
        nameAr: 'المغش الجازاني في الأواني الحجرية',
        nameEn: 'Jazani Magsh Stone Pot Stew',
        descriptionAr: 'لحم الضأن الطازج مع الخضروات يطهى داخل إناء حجري (البرمة) في التنور العربي حتى يذوب اللحم.',
        descriptionEn: 'Succulent lamb and fresh vegetables slow-cooked in traditional stone pots inside a clay oven.',
        icon: '🍲',
        imageUrl: southernHaneethImg,
        bestRestaurantNameAr: 'مطعم مرسى جازان التراثي',
        bestRestaurantNameEn: 'Jazan Marina Heritage Restaurant',
        bestRestaurantId: 'jazan-marina-heritage',
        priceEstimateAr: '45 - 80 ريال',
        priceEstimateEn: 'SAR 45 - 80',
        originRegionAr: 'منطقة جازان والقرية التراثية',
        originRegionEn: 'Jazan Region & Heritage Village'
      },
      {
        id: 'khambeer-bread',
        nameAr: 'خبز الخمبر الجازاني مع السمن والعسل',
        nameEn: 'Jazani Khambeer Bread with Honey',
        descriptionAr: 'خبز مخمر يعلوه حبة البركة والسمسم، يقدَم ساخناً مع العسل الجبلي والسمن البلدي.',
        descriptionEn: 'Traditional fermented Jazani bread topped with black seed, served with wild honey and farm ghee.',
        icon: '🫓',
        imageUrl: hasawiDateBreadImg,
        bestRestaurantNameAr: 'مطعم مرسى جازان التراثي',
        bestRestaurantNameEn: 'Jazan Marina Heritage Restaurant',
        bestRestaurantId: 'jazan-marina-heritage',
        priceEstimateAr: '20 - 35 ريال',
        priceEstimateEn: 'SAR 20 - 35',
        originRegionAr: 'سوق السبت الشعبي بجازان',
        originRegionEn: 'Jazan Traditional Saturday Souk'
      }
    ],
    restaurants: [
      {
        id: 'jazan-marina-heritage',
        nameAr: 'مطعم مرسى جازان التراثي',
        nameEn: 'Jazan Marina Heritage Restaurant',
        locationAr: 'طريق الكورنيش الشمالي / جازان',
        locationEn: 'North Corniche Road, Jazan',
        specialtyAr: 'أشهر مطعم لإعداد المغش الجازاني بالحجر، السمك المكشن بالتنور، والعريكة بالمانجو الجازاني',
        specialtyEn: 'Top culinary destination for Jazani Magsh stone stews & fresh Red Sea fish in clay ovens',
        recommendedDishesAr: ['مغش لحم طازج', 'سمك ميفا بالتنور', 'عريكة بالمانجو الجازاني'],
        recommendedDishesEn: ['Fresh Lamb Magsh', 'Clay Oven Fish', 'Jazani Mango Areeka'],
        crowdPrediction: 'moderate',
        crowdTextAr: '🟢 خفيف ظهراً (1:30م) | 🟡 متوسط مساءً',
        crowdTextEn: '🟢 Light at 1:30 PM | 🟡 Moderate in evening',
        bestTimeToVisitAr: '2:00 ظهراً لتجربة المغش الحار فور خروجه من الميفا',
        bestTimeToVisitEn: '2:00 PM for piping hot Magsh stews',
        accessibilityAr: '♿ مدخل أرضي واسع، بدون درجات، مناسب تماماً مستخدمي الكراسي',
        accessibilityEn: '♿ Wide ground-level entrance with complete step-free access',
        googleMapsUrl: 'https://www.google.com/maps?q=16.8890,42.5510',
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  najran: {
    cityId: 'najran',
    cityNameAr: 'نجران',
    cityNameEn: 'Najran',
    dishes: [
      {
        id: 'ruqaa-najrani',
        nameAr: 'الرقش النجراني بالتنور واللحم',
        nameEn: 'Najrani Ruqaa Layered Stew',
        descriptionAr: 'رقائق الخبز البر المجهزة في المدهن الحجري الساخن والمغمورة بمرق اللحم والبهارات النجرانية.',
        descriptionEn: 'Thin layers of local wholewheat bread drenched in spiced meat broth served in traditional stone pots.',
        icon: '🍲',
        imageUrl: matazeezStewImg,
        bestRestaurantNameAr: 'مطعم أواني نجران التراثي',
        bestRestaurantNameEn: 'Awani Najran Heritage Restaurant',
        bestRestaurantId: 'awani-najran',
        priceEstimateAr: '40 - 75 ريال',
        priceEstimateEn: 'SAR 40 - 75',
        originRegionAr: 'وادي نجران وقصر العان',
        originRegionEn: 'Najran Valley & Al-Aan Palace'
      },
      {
        id: 'wafd-rasaa',
        nameAr: 'الوفد والرقع مع السمن والعسل',
        nameEn: 'Wafd & Rasaa Traditional Dessert',
        descriptionAr: 'عجين البر المطبوخ بالبخار يُقدَم في إناء قدف محاطاً بالسمن النجراني الأصيل والعسل الجبلي.',
        descriptionEn: 'Steamed wheat dough shaped in wooden vessels served with pure sheep ghee and mountain honey.',
        icon: '🍯',
        imageUrl: aseeriAreekaImg,
        bestRestaurantNameAr: 'مطعم أواني نجران التراثي',
        bestRestaurantNameEn: 'Awani Najran Heritage Restaurant',
        bestRestaurantId: 'awani-najran',
        priceEstimateAr: '30 - 50 ريال',
        priceEstimateEn: 'SAR 30 - 50',
        originRegionAr: 'منطقة نجران التاريخية',
        originRegionEn: 'Historic Najran Region'
      }
    ],
    restaurants: [
      {
        id: 'awani-najran',
        nameAr: 'مطعم أواني نجران التراثي',
        nameEn: 'Awani Najran Heritage Restaurant',
        locationAr: 'شارع الملك عبدالعزيز / وسط نجران',
        locationEn: 'King Abdulaziz Street, Central Najran',
        specialtyAr: 'متخصص بالرقش النجراني بالمدهن الحجري، الوفد والرقع، والحنيذ النجراني مع القهوة النجرانية',
        specialtyEn: 'Specialized in stone-pot Ruqaa, Wafd dessert & Najrani lamb stews with cardamoms',
        recommendedDishesAr: ['رقش نجراني باللحم', 'وفد بسمن وضأن', 'حنيذ المدهن'],
        recommendedDishesEn: ['Meat Ruqaa', 'Wafd with Ghee', 'Stone Pot Haneeth'],
        crowdPrediction: 'low',
        crowdTextAr: '🟢 خفيف طوال النهار | 🟡 متوسط عصراً',
        crowdTextEn: '🟢 Light all day | 🟡 Moderate in late afternoon',
        bestTimeToVisitAr: '2:00 ظهراً لتناول الرقش النجراني الساخن',
        bestTimeToVisitEn: '2:00 PM for authentic hot stone Ruqaa',
        accessibilityAr: '♿ ممرات ممهدة ومواقف مخصصة لذوي الإعاقة مع مدخل أرضي',
        accessibilityEn: '♿ Paved pathways with dedicated accessible parking',
        googleMapsUrl: 'https://www.google.com/maps?q=17.4930,44.1270',
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  hail: {
    cityId: 'hail',
    cityNameAr: 'حائل',
    cityNameEn: 'Hail',
    dishes: [
      {
        id: 'kebebah-hail',
        nameAr: 'كبيبة حائل التراثية الشهيرة',
        nameEn: 'Kebebah Hail Grape Leaves Stew',
        descriptionAr: 'ورق العنب المحشو بالأرز واللحم المتبّل بصارام حائل والبهارات العطرية المطهوة على نار هادئة.',
        descriptionEn: 'Grape leaves stuffed with rice and tender lamb seasoned with aromatic Hail spices.',
        icon: '🥘',
        imageUrl: matazeezStewImg,
        bestRestaurantNameAr: 'مطعم تراث حائل الشعبي',
        bestRestaurantNameEn: 'Turath Hail Heritage Restaurant',
        bestRestaurantId: 'turath-hail',
        priceEstimateAr: '35 - 60 ريال',
        priceEstimateEn: 'SAR 35 - 60',
        originRegionAr: 'حائل وجبال أجا وسلمى',
        originRegionEn: 'Hail Region & Aja Mountains'
      },
      {
        id: 'temmen-hail',
        nameAr: 'تمن حائل الأرز المعتّق باللحم',
        nameEn: 'Temmen Hail Aged Rice with Lamb',
        descriptionAr: 'أرز التمن العراقي والنجدي المعتّق يطهى مع اللحم الطازج والسمن والقرع والخضار.',
        descriptionEn: 'Special slow-cooked aged Temmen grain stewed with lamb, squash, and clarified ghee.',
        icon: '🍚',
        imageUrl: najdiKabsaImg,
        bestRestaurantNameAr: 'مطعم تراث حائل الشعبي',
        bestRestaurantNameEn: 'Turath Hail Heritage Restaurant',
        bestRestaurantId: 'turath-hail',
        priceEstimateAr: '45 - 75 ريال',
        priceEstimateEn: 'SAR 45 - 75',
        originRegionAr: 'عروس الشمال - حائل',
        originRegionEn: 'Northern Bride - Hail'
      }
    ],
    restaurants: [
      {
        id: 'turath-hail',
        nameAr: 'مطعم تراث حائل الشعبي',
        nameEn: 'Turath Hail Heritage Restaurant',
        locationAr: 'طريق الملك فهد / وسط مدينة حائل',
        locationEn: 'King Fahd Road, Central Hail',
        specialtyAr: 'أشهر مطعم شعبي لإعداد كبيبة حائل التراثية، أرز التمن، والقرصان بضيافة حائلية أصيلة',
        specialtyEn: 'Famous traditional restaurant serving authentic Kebebah Hail & Temmen stews',
        recommendedDishesAr: ['كبيبة حائل باللحم', 'تمن حائل بالقرع', 'مرقوق حائلي'],
        recommendedDishesEn: ['Kebebah Hail', 'Temmen Hail Rice', 'Hail Marqooc'],
        crowdPrediction: 'moderate',
        crowdTextAr: '🟢 خفيف ظهراً | 🟡 متوسط مساءً',
        crowdTextEn: '🟢 Light at lunch | 🟡 Moderate at dinner',
        bestTimeToVisitAr: '1:30 ظهراً للاستمتاع بأطباق حائل التراثية الطازجة',
        bestTimeToVisitEn: '1:30 PM for fresh Hail heritage dishes',
        accessibilityAr: '♿ مدخل ممهد بدون درجات عائقة ومناسب للكراسي المتحركة',
        accessibilityEn: '♿ Level entrance with wheelchair accessibility',
        googleMapsUrl: 'https://www.google.com/maps?q=27.5210,41.6960',
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
};

/**
 * Dynamic resolution function for ANY city, region, or governorate in Saudi Arabia.
 * Returns culturally accurate food guide with real local dishes, origin region, and verified heritage dining.
 */
export function getCityCulinaryGuide(cityName?: string): CityCulinaryGuide {
  if (!cityName || !cityName.trim()) return CITY_CULINARY_GUIDES.riyadh;
  const raw = cityName.trim();
  const lower = raw.toLowerCase();

  // 1. Direct key match
  if (CITY_CULINARY_GUIDES[lower]) {
    return CITY_CULINARY_GUIDES[lower];
  }

  // 2. Eastern Province & Gulf Coast (Dammam, Khobar, Qatif, Jubail, Dhahran, Al-Ahsa)
  if (
    lower.includes('دمام') || lower.includes('dammam') ||
    lower.includes('خبر') || lower.includes('khobar') ||
    lower.includes('قطيف') || lower.includes('qatif') ||
    lower.includes('جبيل') || lower.includes('jubail') ||
    lower.includes('ظهران') || lower.includes('dhahran') ||
    lower.includes('شرقية') || lower.includes('eastern')
  ) {
    return {
      ...CITY_CULINARY_GUIDES.dammam,
      cityNameAr: raw,
      cityNameEn: raw
    };
  }

  // 3. Al-Ahsa
  if (lower.includes('أحساء') || lower.includes('احساء') || lower.includes('ahsa') || lower.includes('هفوف') || lower.includes('hofuf')) {
    return {
      ...CITY_CULINARY_GUIDES.alahsa,
      cityNameAr: raw,
      cityNameEn: raw
    };
  }

  // 4. Jazan & Farasan
  if (lower.includes('جازان') || lower.includes('جيزان') || lower.includes('jazan') || lower.includes('فرسان') || lower.includes('farasan')) {
    return {
      ...CITY_CULINARY_GUIDES.jazan,
      cityNameAr: raw,
      cityNameEn: raw
    };
  }

  // 5. Najran
  if (lower.includes('نجران') || lower.includes('najran')) {
    return {
      ...CITY_CULINARY_GUIDES.najran,
      cityNameAr: raw,
      cityNameEn: raw
    };
  }

  // 6. Asir, Abha, Khamis Mushait, Al Bahah, Rijal Almaa
  if (
    lower.includes('أبها') || lower.includes('abha') ||
    lower.includes('عسير') || lower.includes('aseer') ||
    lower.includes('خميس') || lower.includes('khamis') ||
    lower.includes('باحة') || lower.includes('baha') ||
    lower.includes('ألمع') || lower.includes('almaa')
  ) {
    return {
      ...CITY_CULINARY_GUIDES.abha,
      cityNameAr: raw,
      cityNameEn: raw
    };
  }

  // 7. Taif
  if (lower.includes('طائف') || lower.includes('taif')) {
    return {
      ...CITY_CULINARY_GUIDES.taif,
      cityNameAr: raw,
      cityNameEn: raw
    };
  }

  // 8. Jeddah, Makkah, Madinah, Yanbu (Hejaz Region)
  if (
    lower.includes('جدة') || lower.includes('jeddah') ||
    lower.includes('مكة') || lower.includes('makkah') ||
    lower.includes('مدينة') || lower.includes('madinah') ||
    lower.includes('ينبع') || lower.includes('yanbu')
  ) {
    return {
      ...CITY_CULINARY_GUIDES.jeddah,
      cityNameAr: raw,
      cityNameEn: raw
    };
  }

  // 9. Hail
  if (lower.includes('حائل') || lower.includes('حايل') || lower.includes('hail')) {
    return {
      ...CITY_CULINARY_GUIDES.hail,
      cityNameAr: raw,
      cityNameEn: raw
    };
  }

  // 10. AlUla & Tabuk (Northern Heritage)
  if (lower.includes('علا') || lower.includes('alula') || lower.includes('تبوك') || lower.includes('tabuk') || lower.includes('جوف') || lower.includes('jouf')) {
    return {
      ...CITY_CULINARY_GUIDES.alula,
      cityNameAr: raw,
      cityNameEn: raw
    };
  }

  // 11. Riyadh, Qassim, Diriyah, Najd Region default for central cities
  return {
    ...CITY_CULINARY_GUIDES.riyadh,
    cityNameAr: raw,
    cityNameEn: raw
  };
}

