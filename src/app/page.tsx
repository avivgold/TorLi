import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CreditCard,
  CheckCircle,
} from "lucide-react";

// Create a placeholder OnboardingFlow component since the actual one seems to have issues
const OnboardingFlow = () => {
  return (
    <div className="p-6 bg-background">
      <h2 className="text-2xl font-bold mb-4">התחל עם תור לי</h2>
      <p className="text-muted-foreground mb-6">
        מלא את הטופס הקצר כדי להתחיל לחפש תורים ממשלתיים.
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            אימייל או טלפון
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="הכנס את האימייל או מספר הטלפון שלך"
          />
        </div>
        <Button className="w-full">המשך</Button>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            הזמנת תורים ממשלתיים{" "}
            <span className="text-primary">באופן אוטומטי</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            לא עוד המתנה של חודשים לדרכון, רישיון נהיגה או שירותים ממשלתיים
            אחרים. אנחנו נמצא ונזמין עבורך את התורים הזמינים הקרובים ביותר.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="text-lg px-8 py-6">
                התחל עכשיו <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <OnboardingFlow />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">איך זה עובד?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                ספר לנו מה אתה צריך
              </h3>
              <p className="text-muted-foreground">
                בחר את השירות, הסניפים המועדפים וטווח התאריכים. אנחנו נטפל בשאר.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">אנחנו מוצאים תורים</h3>
              <p className="text-muted-foreground">
                המערכת שלנו בודקת אתרים ממשלתיים כל 2-3 דקות כדי למצוא את התורים
                הזמינים המוקדמים ביותר.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">התראה מיידית</h3>
              <p className="text-muted-foreground">
                קבל התראה באמצעות וואטסאפ או SMS כאשר אנו מוצאים תור. אשר בלחיצה
                אחת.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            תמחור פשוט, תשלום רק בהצלחה
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            אתה משלם רק כאשר אנחנו מצליחים להזמין תור עבורך.
          </p>
          <div className="bg-background border rounded-xl p-8 shadow-sm">
            <div className="flex items-center justify-center mb-4">
              <CreditCard className="h-10 w-10 text-primary ml-3" />
              <h3 className="text-3xl font-bold">₪29</h3>
            </div>
            <p className="text-muted-foreground mb-6">לכל הזמנה מוצלחת</p>
            <ul className="space-y-3 text-right mb-8">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary ml-2 mt-0.5" />
                <span>חיפושי תורים ללא הגבלה</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary ml-2 mt-0.5" />
                <span>התראות מיידיות כאשר נמצאים תורים</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary ml-2 mt-0.5" />
                <span>תשלום רק כאשר אתה מאשר הזמנה</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary ml-2 mt-0.5" />
                <span>תשלום מאובטח באמצעות Stripe</span>
              </li>
            </ul>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full">
                  התחל עכשיו
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <OnboardingFlow />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">שאלות נפוצות</h2>
          <div className="space-y-6">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                אילו שירותים ממשלתיים אתם תומכים?
              </h3>
              <p className="text-muted-foreground">
                אנו תומכים כרגע בתורים לדרכון, חידושי רישיון נהיגה, פגישות ביטוח
                לאומי ועוד. ראה את הרשימה המלאה בזמן ההרשמה.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                כמה מהר אתם יכולים למצוא תורים?
              </h3>
              <p className="text-muted-foreground">
                זה תלוי בזמינות, אבל המערכת שלנו בודקת כל 2-3 דקות. משתמשים רבים
                מקבלים תורים תוך שעות או ימים במקום להמתין חודשים.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                מתי אני משלם את העמלה?
              </h3>
              <p className="text-muted-foreground">
                אתה משלם רק לאחר שאנו מוצאים תור ואתה מאשר שאתה רוצה בו. אין
                עלויות מראש או דמי מנוי.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 lg:px-8 border-t">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">תור לי</h2>
            <p className="text-muted-foreground">תורים ממשלתיים אוטומטיים</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 md:space-x-reverse">
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground"
            >
              תנאי שימוש
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground"
            >
              מדיניות פרטיות
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground"
            >
              צור קשר
            </Link>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} תור לי. כל הזכויות שמורות.
        </div>
      </footer>
    </div>
  );
}
