// AI Chat utility using Groq API
// Make sure to set VITE_GROQ_API_KEY in your .env file

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const systemPrompt = `You are Janmitra, an AI-powered digital civic assistant designed to help Indian citizens. You specialize in:

1. Explaining Indian laws, constitutional rights, and civic procedures
2. Helping citizens understand their fundamental rights
3. Providing guidance on filing complaints and reports
4. Information about government schemes and services
5. Legal literacy and civic awareness

Your tone should be:
- Friendly and approachable
- Clear and easy to understand
- Supportive and empowering
- Multilingual capable (respond in the language the user uses)
- Non-judgmental and inclusive

Always:
- Encourage citizens to take action for their rights
- Provide accurate information about Indian laws
- Be honest if you don't know something
- Suggest official channels when appropriate
- Respect user privacy and confidentiality`;

export async function getChatResponse(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    // Fallback to mock responses if API key is not available
    return getMockResponse(userMessage);
  }

  try {
    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: userMessage },
    ];

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      console.error("Groq API error:", response.status);
      return getMockResponse(userMessage);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Chat API error:", error);
    return getMockResponse(userMessage);
  }
}

function getMockResponse(userMessage: string): string {
  const lowerInput = userMessage.toLowerCase();

  // Comprehensive mock responses covering common topics
  const responses: { [key: string]: string } = {
    "hello|hi|hey": "नमस्ते! Hello! I'm Janmitra, your digital civic assistant. I'm here to help you understand your rights, navigate government services, and file complaints. What can I assist you with today?",

    "rights|fundamental|constitution": `Every Indian citizen has fundamental rights under the Indian Constitution (Part III):

1. **Right to Equality (Articles 14-18)**
   - Equality before law
   - Equal protection of law
   - No discrimination by state
   - Equality of opportunity in public employment

2. **Right to Freedom (Articles 19-22)**
   - Freedom of speech and expression
   - Freedom of assembly
   - Freedom of association
   - Freedom of movement
   - Freedom of residence and profession
   - Freedom of conscience and religion

3. **Right Against Exploitation (Articles 23-24)**
   - Prohibition of traffic in human beings
   - Prohibition of forced labor
   - Protection of child labor

4. **Right to Freedom of Religion (Articles 25-28)**
   - Freedom of conscience and free profession, practice and propagation of religion
   - Right to manage religious affairs
   - Freedom from religious taxes
   - Freedom from religious education

5. **Cultural and Educational Rights (Articles 29-30)**
   - Protection of interests of minorities
   - Right of minorities to establish educational institutions

6. **Right to Constitutional Remedies (Article 32)**
   - Right to move Supreme Court for enforcement of rights

Would you like to know more about any specific right?`,

    "complaint|report|file|issue": `I can help you file a complaint! Here's the process:

**Step 1: Identify the Issue**
- What is the problem? (e.g., corruption, poor service, rights violation)
- Where did it occur? (location, office, etc.)
- When did it happen? (date and time)

**Step 2: Choose the Right Channel**
- **RTI (Right to Information)**: For government information
- **Grievance Portal**: For public service complaints
- **Police**: For criminal matters
- **District Administration**: For general issues
- **Ombudsman/Lokpal**: For corruption

**Step 3: File the Complaint**
- Provide clear details
- Include supporting documents
- Use online portals for transparency
- Keep a reference number

**Step 4: Follow Up**
- Track your complaint status
- Maintain documentation
- Escalate if needed

Would you like help with a specific type of complaint?`,

    "rti|right to information": `The Right to Information (RTI) Act, 2005 allows any Indian citizen to:

**What you can request:**
- Government records and documents
- Information about policies and decisions
- Budget details and expenditures
- Environmental and health information

**How to file RTI:**
1. Write a formal application
2. Specify exactly what information you need
3. Pay the fee (typically ₹10)
4. Submit to the concerned government office
5. You must receive a response within 30 days

**Important Points:**
- Keep your request specific and clear
- Mention RTI Act, 2005 in your application
- You can appeal if denied
- Use the Right to Information portal

**Where to file:**
- Online: File through government RTI portals
- Offline: Submit to Public Information Officer (PIO) at relevant office

Need help drafting an RTI application?`,

    "voting|election|vote": `As an Indian citizen, you have the right to vote. Here's what you need to know:

**Voting Rights:**
- Must be 18 years or older
- Indian citizen
- Resident in the constituency for at least 6 months

**How to Register:**
1. Go to Electoral Commission website or visit your local Election Office
2. Fill Form 6 (New Voter Registration)
3. Provide proof of identity and residence
4. Your name will be added to the voter list

**Voting Process:**
1. Locate your polling booth using your voter ID
2. Go on Election Day with your voter ID/any government ID
3. Cast your vote
4. Your vote is secret and secure

**Your Voting Rights:**
- Vote for candidate of your choice
- Vote is completely confidential
- No one can force you to vote for someone
- Casting fake votes is illegal

Remember: Voting is your power! Use it wisely.`,

    "women|harassment|safety": `You have important rights and protections. Here are key resources:

**Rights:**
- Equal treatment under law
- No discrimination in employment
- Safe working conditions
- Protection from harassment and violence

**If You Face Harassment or Violence:**
- Call National Commission for Women: 011-4141-9910
- Emergency: 100 (Police)
- Women's Helpline: 1090 or 1800-233-4006
- Local NGOs and counseling centers

**Legal Protections:**
- Protection of Women from Domestic Violence Act, 2005
- Sexual Harassment of Women at Workplace Act, 2013
- Dowry Prohibition Act, 1961
- Criminal laws against assault and rape

**Steps to Take:**
1. Report immediately to police
2. Seek medical help if needed
3. File FIR (First Information Report)
4. Contact women's organizations
5. Document evidence

**Support Available:**
- Free legal aid
- Counseling services
- Shelter and protection
- Safe reporting mechanisms

You are not alone. Help is available.`,

    "child|children|minor": `Children have special protections under Indian law:

**Rights of Children:**
- Right to free education (up to 14 years)
- Right to protection from exploitation
- Right to live with parents
- Right to nutrition and health
- Right to play and development

**Child Protection Laws:**
- Juvenile Justice Act, 2015
- Right to Free and Compulsory Education Act, 2009
- Child Labor Prohibition and Regulation Act, 1986
- Bonded Labor System Abolition Act, 1976

**Child Abuse/Exploitation:**
- Call Child Helpline: 1098
- Report to Police: 100
- Contact NGOs and child welfare boards
- File complaint with District Child Welfare Committee

**Free Resources:**
- Government schools
- Midday meal scheme
- Health checkups
- Learning support

If a child is in danger, report immediately to authorities.`,

    "employment|job|work": `Employment Rights and Protections:

**Worker Rights:**
- Right to fair wages
- Safe working conditions
- Reasonable working hours
- Protection from discrimination
- Right to form unions
- Protection from child labor and forced labor

**Employment Standards:**
- Minimum wage requirements vary by state
- Working hours: Max 48 hours/week (normally)
- Overtime compensation: 2x minimum rate
- Leave entitlements (casual, sick, earned)
- Gratuity and provident fund

**If Exploited:**
1. Document issues (dates, incidents, witnesses)
2. Report to Labor Department
3. Contact your employer's HR
4. File complaint with Labor Commissioner
5. Seek legal aid if needed

**Key Resources:**
- Labor Department: Check your state's office
- Free Legal Aid: Available in most states
- Trade Unions: Can help with collective issues

**Important Laws:**
- Industrial Disputes Act, 1947
- Factories Act, 1948
- Occupational Safety, Health & Working Conditions Code

Know your rights as a worker!`,

    "pollution|environment": `Environmental Rights and Protections:

**Your Rights:**
- Right to live in clean environment
- Right to access information about pollution
- Right to file PIL (Public Interest Litigation)
- Right to compensation for environmental damage

**Environmental Laws:**
- Water Pollution Control Act, 1974
- Air Pollution Control Act, 1981
- Environment Protection Act, 1986
- Forest Conservation Act, 1980
- Wildlife Protection Act, 1972

**If You Face Pollution:**
1. Document the pollution (photos, samples)
2. File complaint with Pollution Control Board
3. Contact District Magistrate
4. Use RTI to get official data
5. Can file case in court

**How to Report:**
- Contact State Pollution Control Board
- File online through CPCB portal
- Report to Environmental Ministry
- Approach NGOs and environmental groups

**Getting Compensation:**
- National Green Tribunal (NGT) for claims
- Courts can order remedies
- Polluter pays principle applies

Protect our environment, protect our future!`,

    "corruption|bribery|rti": `Fighting Corruption:

**Legal Frameworks:**
- Prevention of Corruption Act, 1988
- Right to Information (RTI) Act, 2005
- Public Interest Disclosure and Protection of Informers (PIDPI) Scheme
- Whistleblower Protection Act

**Reporting Corruption:**
1. **To Police**: File FIR at local police station
2. **CBI**: For major federal crimes
3. **Lokpal**: For corruption by public servants
4. **State Lokayukta**: For state-level corruption
5. **RTI**: To get transparency

**Anonymous Reporting:**
- Many agencies accept anonymous complaints
- Whistleblower Act protects your identity
- Document evidence safely

**Protection:**
- Whistleblower Protection Act, 2014
- Your identity can be kept confidential
- Anti-retaliation provisions

**Online Portals:**
- Lokpal official website
- CBI official website
- RTI portals of respective agencies

**Resources:**
- PIDPI Scheme of PMO
- NGOs fighting corruption
- Free legal aid organizations

Your complaint matters. Report corruption!`,

    "education|school|college|study": `Education Rights and Schemes:

**Right to Education:**
- Free and compulsory education until 14 years
- Equal access for all children
- No discrimination in schools
- Special provision for disabled students

**Government Schemes:**
- Mid Day Meal Scheme
- Scholarships for SC/ST/OBC students
- Girl child education programs
- Special education for disabled

**Online Learning:**
- SWAYAM (online courses - free)
- NPTEL (tech courses)
- DIKSHA platform
- State education portals

**If You Face Issues:**
- School/College administration
- District Education Officer
- State Board of Education
- File RTI for transparency

**Important Laws:**
- Right to Free and Compulsory Education Act, 2009
- Persons with Disabilities Act, 2016
- Anti-bullying policies

**Financial Assistance:**
- Scholarships and grants
- Student loans with benefits
- Fee waiver schemes
- Hostel assistance

Education is your right! Make full use of opportunities.`,

    "pension|retirement|senior citizen": `Senior Citizens Rights and Entitlements:

**Government Schemes:**
- Old Age Pension: ₹200-1000/month (varies by state)
- Ayushman Bharat: Free health insurance
- Senior Citizen Savers Scheme: Special interest rates
- SSPY Scheme: Pension for widows and disabled

**Benefits:**
- Concessions in travel (trains, buses)
- Medical benefits and health checkups
- Property tax exemptions in some states
- Banking facilities with benefits

**If Issues with Pension:**
1. Contact Pension Disbursing Bank
2. File complaint with Pension Division
3. Approach District Administration
4. Use RTI for transparency

**Rights:**
- Right to dignified life
- No discrimination in services
- Free emergency healthcare in some states
- Legal aid for disputes

**Support Services:**
- Senior citizen helplines in states
- NGOs providing elderly care
- Community health centers
- Legal aid for elderly

**Registration:**
- Apply at local pension office
- Provide age proof and identity
- Bank account linking is mandatory

Respect and support for elders is a societal responsibility!`,

    "help|assist|what can": "I can help you with:\n• Information about your fundamental rights\n• Understanding laws and government procedures\n• Filing complaints and reports\n• Information about government schemes\n• Legal literacy and civic awareness\n• Employment, education, health, and environment issues\n\nWhat topic would you like to explore?",

    "default": "Thank you for reaching out! Could you provide more details about what you need help with? I'm here to assist with information about:\n\n• Your Constitutional rights\n• Government services and schemes\n• Filing complaints and reports\n• Laws and legal procedures\n• Civic issues and governance\n\nWhat would you like to know?",
  };

  // Check for keyword matches
  for (const [keywords, response] of Object.entries(responses)) {
    if (keywords !== "default") {
      const keywordArray = keywords.split("|");
      if (keywordArray.some((keyword) => lowerInput.includes(keyword))) {
        return response;
      }
    }
  }

  return responses.default;
}
